import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

import { Dataset } from '../models/models';

interface ChartingProps {
    datasets: Dataset[],
    width: number
}

function ChartIndicators({ datasets, width }: ChartingProps) {
    const [indicatorCharts, setIndicatorCharts] = useState<JSX.Element[]>([<p key={"faded"}></p>])

    useEffect(() => {
        if (datasets && datasets.length > 0) {
            console.log("this is only ran once, dataset length: " + datasets.length)
            const chartTags = datasets.map((data: Dataset, index: number) => (
                <Plot
                    key={index}

                    data={[
                        {
                            x: data.date,
                            y: data.price,
                            type: "scatter",
                            mode: 'lines+markers',
                            marker: { color: "Red" }
                        }
                    ]}
                    layout={{
                        title: {
                            text: "RSI",
                            font: {
                                color: "#FFF",
                                weight: 1000
                            }
                        },
                        height: 350,
                        width: width,
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

                />
            ))
            if (chartTags) {
                setIndicatorCharts(chartTags)
            }
        }
    }, [datasets.length, width])
    return (
        <>
            {indicatorCharts}
        </>
    )
}

export default ChartIndicators