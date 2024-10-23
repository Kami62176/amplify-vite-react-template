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
            layout={{ width: 1500, height: 800 }}
        />
    )
}


export default CryptoChart