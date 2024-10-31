import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DialogProps, DialogsProvider, useDialogs } from "@toolpad/core/useDialogs";
import { useState } from "react";


class Dataset {
    date: Date[]
    price: number[];
  
    constructor(date: Date[] = [], price: number[] = []) {
      this.date = date
      this.price = price
    }
}

interface IndicatorProps {
    data: Dataset
    indicatorDatasets: Dataset[]
    setIndicatorDatasets: React.Dispatch<React.SetStateAction<Dataset[]>>
}

export default function AddIndicatorButton({data, indicatorDatasets, setIndicatorDatasets}: IndicatorProps) {

    function MyDialog({ open, onClose }: DialogProps) {
        return (
            <Dialog fullWidth open={open} onClose={() => onClose()}>
                <DialogTitle>Add Indicator</DialogTitle>
                <DialogContent>
                    <AddRsiButton data={data} indicatorDatasets={indicatorDatasets} setIndicatorDatasets={setIndicatorDatasets}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }


    function IndicatorButton() {
        const dialogs = useDialogs()
        return (
            <Button 
            variant="outlined"
            onClick={async () => {
                await dialogs.open(MyDialog)
            }}>
                Indicator
            </Button>
        )
    }

    return (
        <DialogsProvider>
            <IndicatorButton/>
        </DialogsProvider>
    )
}

function AddRsiButton({data, indicatorDatasets, setIndicatorDatasets}: IndicatorProps){//React.MouseEventHandler<HTMLButtonElement> | undefined) {
    
    function RsiDialog({ open, onClose }: DialogProps<undefined, number | null>) {
        const [length, setLength] = useState(14)
        
        return (
            <Dialog open={open} onClose={() => onClose(null)}>
                <DialogTitle>Rsi Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter RSI Length</DialogContentText>
                    <TextField
                        label="Length"
                        fullWidth
                        type="number"
                        value={length}
                        onChange={(event) => setLength(parseInt(event.currentTarget.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onClose(length)
                        }}>Add</Button>
                </DialogActions>
            </Dialog>
        )
    }
    const dialogs = useDialogs()
    return (
        <DialogsProvider>
            <Button onClick={async () => {
                const length = await dialogs.open(RsiDialog)
                console.log(length)

                const rsiData = await GetRsiData(data, length)
                console.log(rsiData)

                const indicatorDataset = new Dataset(data.date, rsiData)
                setIndicatorDatasets([...indicatorDatasets, indicatorDataset])
            }} 
            fullWidth
            variant="outlined"
            >RSI</Button>
        </DialogsProvider>
    )
}


const GetRsiData = async (data: Dataset, length: number | null) => {
    try {
        if (length == null) {return}
        const options = {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }

        let response = await fetch(`http://localhost:3000/indicator/rsi/${length}`, options)
        return response.json()
    } catch (err) {
        console.error(err)
    } 
}