import { Box, Button, TextField } from "@mui/material";
import LeftNavBar from "../components/LeftNavBar";
import VirtualizedAutoComplete from "../components/VirtualizedAutoComplete";
import { useState } from "react";
import { StrategyInfo, TokenInfo } from "../models/models";
import Plot from "react-plotly.js";


export default function () {
    const [selection, setSelection] = useState<TokenInfo | null>(null)
    const [length, setLength] = useState<string>("14")
    const [data, setStrategyInfo] = useState<StrategyInfo | null>(null)

    async function getRsiStrat() {
        try {
            const options = {
                method: "GET"
            }
            const response = await fetch(`http://localhost:3001/strategy/${selection?.id}/rsi/${length}`, options)
            const body = await response.json()

            let strategyInfo = new StrategyInfo(body.date, body.price, body.equity, body["total-trades"],
                body.sharpie, body.sortino, body.omega, body['max-drawdown'], body.trades
            )


            setStrategyInfo(strategyInfo)
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
                    <Button variant="outlined" color="white" sx={{ margin: 1 }} onClick={() => getRsiStrat()}>Submit</Button>
                </Box>
                {data ?
                    <Plot
                        data={[
                            {
                                x: data.date,
                                y: data.equity,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'white' },
                                name: 'Equity',
                                yaxis: 'y1'
                            },
                            {
                                x: data.date,
                                y: data.price,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: '#1925f7' },
                                name: 'Price',
                                yaxis: 'y2'
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
                                l: 50,
                                r: 50,
                                b: 40,
                                t: 50
                            },
                            yaxis: {
                                title: "Equity",
                                side: 'right',
                                color: '#FFFFFF',         // Color of the y-axis line and ticks
                                gridcolor: '#b2b2d4',     // Color of the y-axis grid lines
                                zerolinecolor: '#FFFFFF',
                            },
                            yaxis2: {
                                title: 'Price',
                                overlaying: 'y',
                                side: 'left',
                                showgrid: false,
                                zeroline: false,
                                color: '#FFFFFF'
                            },
                            paper_bgcolor: '#2b2b3d',
                            plot_bgcolor: '#4a4a5e',
                            xaxis: {
                                color: '#FFFFFF',         // Color of the x-axis line and ticks
                                gridcolor: '#b2b2d4',     // Color of the x-axis grid lines
                                zerolinecolor: '#FFFFFF', // Color of the x-axis zero line (if visible)
                            },
                            legend: {
                                x: 1.05
                            }
                        }}
                    /> :
                    <></>
                }
            </div>
        </main>
    )
}

