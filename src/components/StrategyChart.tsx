import Plot from "react-plotly.js";
import { StrategyInfo, TokenInfo } from "../models/models";

interface ChartProps {
    data: StrategyInfo
    selection: TokenInfo | null
    width: number
}
export default function ( {data, selection, width}: ChartProps) {
    return (
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
                width: width, height: 500,
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
        />
    )
}