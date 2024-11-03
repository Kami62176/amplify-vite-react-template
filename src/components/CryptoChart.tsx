import Plot from 'react-plotly.js';

class Dataset {
    date: Date[]
    price: number[];

    constructor(date: Date[] = [], price: number[] = []) {
        this.date = date
        this.price = price
    }
}

interface ChartingProps {
    data: Dataset
    token: string
    width: number
}

function CryptoChart({ data, token, width }: ChartingProps) {
    // console.log(JSON.stringify(data))
    return (
        <Plot
            divId='main-chart'
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
                    text: `${token.toUpperCase()} Price`,
                    font: {
                        color: "#FFF",
                        weight: 1000
                    }
                },
                width: width, height: window.innerHeight * 0.6,
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
    )
}


export default CryptoChart