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

function CryptoChart( {data} : ChartingProps){
    return (
        <Plot
            data={[
                {
                    x: data.date,
                    y: data.price,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                }
            ]}
            layout={{width: 800, height: 500}}
        />
    )
}


export default CryptoChart