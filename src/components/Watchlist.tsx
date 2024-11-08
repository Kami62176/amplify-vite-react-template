import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { Button, Container, Dialog, DialogActions, DialogTitle, ListItemButton, Typography } from '@mui/material';

import { DialogsProvider, useDialogs, DialogProps } from '@toolpad/core/useDialogs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import VirtualizedAutoComplete from './VirtualizedAutoComplete';

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
const client = generateClient<Schema>();

interface WatchlistProps {
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function Watchlist({ setToken }: WatchlistProps) {
    const [watchlist, setWatchlist] = useState<Array<Schema["Watchlist"]["type"]>>([])


    useEffect(() => {
        client.models.Watchlist.observeQuery().subscribe({
            next: (data) => setWatchlist([...data.items]),
        });
    }, []);

    function MyDialog({ open, onClose }: DialogProps) {
        const [selection, setSelection] = useState<TokenInfo | null>(null)

        return (
            <Dialog fullWidth open={open} onClose={() => onClose()} disablePortal={false}>
                <div className="add-to-watchlist-dialog">
                    <DialogTitle color="white">Select Token to Add to Watchlist</DialogTitle>
                    <Container>
                        <VirtualizedAutoComplete setSearch={setSelection} />
                    </Container>
                    <DialogActions>
                        <Button color='white' onClick={() => onClose()}>Cancel</Button>
                        <Button color='white' onClick={() => {
                            CreateWatchlistItem(selection)
                            onClose()
                        }}>Add</Button>
                    </DialogActions>
                </div>
            </Dialog>
        )
    }

    function SelectToken() {
        const dialogs = useDialogs()
        return (
            <>
                <IconButton
                    onClick={async () => {
                        const tokenId = await dialogs.open(MyDialog)
                        console.log(tokenId)
                    }}
                    color="white"
                >
                    <AddIcon />
                </IconButton>
            </>
        )
    }

    function PromptDialog() {
        return (
            <DialogsProvider>
                <SelectToken />
            </DialogsProvider>
        )
    }

    function ChartToken(tokenId: string | undefined | null) {
        if (tokenId) {
            setToken(tokenId)
        }
    }

    return (
        <>
            <List className="watchlist" sx={{ width: '100%', maxWidth: 360, padding: 1, borderTopLeftRadius: 4 }}>
                <ListItem
                    disableGutters
                    secondaryAction={<PromptDialog />}//</List><IconButton onClick={AddTokenToWatchlist}><AddIcon/></IconButton>}
                >
                    <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>Watchlist</Typography>
                </ListItem>
                {watchlist.map((item) => {
                    return (
                        <ListItem
                            className="watchlist-item"
                            key={item.id}
                            disableGutters
                            disablePadding
                            secondaryAction={
                                <IconButton
                                    onClick={() => RemoveTokenFromWatchlist(item.id)}
                                    color="white"
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            }
                        >
                            <ListItemButton onClick={() => { ChartToken(item.tokenId) }}>
                                <Typography className="watchlist-item" sx={{ fontSize: 13 }}>{item.name}</Typography>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}

type TokenInfo = {
    id: string;
    name: string;
    symbol: string;
};


function RemoveTokenFromWatchlist(tokenId: string) {
    client.models.Watchlist.delete({ id: tokenId })
}


function CreateWatchlistItem(tokenInfo: TokenInfo | null) {
    if (tokenInfo) {
        console.log("these are the models: " + JSON.stringify(client.models))
        client.models.Watchlist.create({ tokenId: tokenInfo?.id, symbol: tokenInfo?.symbol, name: tokenInfo?.name })
    }
}