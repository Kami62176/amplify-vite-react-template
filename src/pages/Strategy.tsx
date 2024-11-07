import { Box, Button, TextField, Typography } from "@mui/material";
import LeftNavBar from "../components/LeftNavBar";
import VirtualizedAutoComplete from "../components/VirtualizedAutoComplete";
import { useState } from "react";
import { TokenInfo } from "../models/models";
import { Dataset } from "../models/models";
import Plot from "react-plotly.js";


export default function () {
    const [selection, setSelection] = useState<TokenInfo | null>(null)
    const [length, setLength] = useState<string>("14")
    const [data, setDataset] = useState<Dataset | null>(null)

    async function getRsiStrat() {
        try {
            const options = {
                method: "GET"
            }
            const response = await fetch(`http://localhost:3001/strategy/${selection?.id}/rsi/${length}`, options)
            const body = await response.json()

            let dataset = new Dataset()
            dataset.price = body.price
            dataset.date = body.date

            setDataset(dataset)
        } catch (err) {
            console.error(err)
        }
    }




    return (
        <main className="main-page">
            <LeftNavBar />
            <div>
            <Box >
            <VirtualizedAutoComplete setSearch={setSelection} />
            <TextField
                sx={{ color: "white" }}
                label="Length"
                type="number"
                defaultValue={14}
                onChange={(event) => setLength(event.target.value)}
            />
            <Button variant="outlined" color="white" sx={{margin: 1}} onClick={() => getRsiStrat()}>Submit</Button>
            </Box>
            {data ?
                <Plot
                    data={[
                        {
                            x: data.date,
                            y: data.price,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'white' },
                        }
                    ]}
                    layout={{
                        title: {
                            text: `${selection?.symbol.toUpperCase()} RSI Equity`,
                            font: {
                                color: "#FFF",
                                weight: 1000
                            }
                        },
                        width: 1000, height: 500,
                        margin: {
                            l: 15,
                            r: 40,
                            b: 40,
                            t: 50
                        },
                        yaxis: {
                            side: 'right',
                            color: '#FFFFFF',         // Color of the y-axis line and ticks
                            gridcolor: '#b2b2d4',     // Color of the y-axis grid lines
                            zerolinecolor: '#FFFFFF',
                        },
                        paper_bgcolor: '#2b2b3d',
                        plot_bgcolor: '#4a4a5e',
                        xaxis: {
                            color: '#FFFFFF',         // Color of the x-axis line and ticks
                            gridcolor: '#b2b2d4',     // Color of the x-axis grid lines
                            zerolinecolor: '#FFFFFF', // Color of the x-axis zero line (if visible)
                        },
                    }}
                /> :
                <></>
            }
            </div>
        </main>
    )
}

