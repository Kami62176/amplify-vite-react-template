

import { Autocomplete, TextField } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

class Dataset {
    date: Date[]
    price: number[];

    constructor(date: Date[] = [], price: number[] = []) {
        this.date = date
        this.price = price
    }
}

function CryptoChart(){
    const [isLoading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Dataset>(new Dataset())
    const [token, setToken] = useState<string>("bitcoin")
    const [tokenList, setTokenList] = useState<string[]>(["bitcoin", "solana", "eth"])
    setToken("bitcoin")
    setTokenList(["bitcoin", "solana", "eth"])
    const retreiveCryptoData = async () => {
        setLoading(true)
        try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-4pjqNJFng5KrtEHMvmrwLCyp '
            }
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=365&interval=daily`, options)
            .then(response => response.json())
            .then(response => {
                    console.log("Response gotten")
                    let dataset = new Dataset() 
                    response.prices.map((datapoint: Array<number>) => {
                        dataset.date.push(new Date(datapoint[0]))
                        dataset.price.push(datapoint[1])
                    }) 
                    console.log(dataset)
                    setData(dataset)
                })
            .catch(err => console.error(err));
            }catch(err) {

            } finally {
                setLoading(false)
            }
    }

    useEffect(() => {
        retreiveCryptoData()
        },
        []
    )

    return (
        <>
            {isLoading ? 
            <></> :
            <>
                <AutoTokenSearch tokenList={tokenList}/>
                <LineChart        
                    xAxis={
                        [{ 
                            scaleType: 'time',
                            data: data.date 
                        }]}
                    series={[
                    {
                        data: data.price,
                    },
                    ]}
                    width={800}
                    height={300}
                />
            </>
            }
        </>
        
    )
}

interface AutoTokenSearchProps {
    tokenList: string[];
}

function AutoTokenSearch( {tokenList}: AutoTokenSearchProps ) {
    return (
        <Autocomplete disableClearable freeSolo id="free-solo-2-demo"
        options={tokenList}
        renderInput={(params) => (
        <TextField {...params} label="Search" 
            slotProps={{
                input: {
                    ...params.InputProps,
                    type: 'search',
                },
            }}
        />        
        )}
    />
    )
}

export default CryptoChart