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
}

function CryptoChart({ data }: ChartingProps) {
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
                    marker: { color: 'MidnightBlue' },
                }
            ]}
            layout={{ width: window.innerWidth * 0.80, height: window.innerHeight * 0.8}}
        />
    )
}


export default CryptoChart