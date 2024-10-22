

import { Button } from "@aws-amplify/ui-react";
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

class TokenInfo {
    id: string
    symbol: string
    name: string
    constructor(id: string = "bitcoin", symbol: string = "BTC", name: string = "Bitcoin") {
        this.id = id
        this.symbol = symbol
        this.name = name
    }
}


function CryptoChart(){
    const [isLoading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Dataset>(new Dataset())
    const [token, setToken] = useState<string>("bitcoin")
    const [tokenList, setTokenList] = useState<TokenInfo[]>([])
    const [search, setSearch] = useState<TokenInfo>()
    
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
            console.log("Getting token data from " + token)
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
        [token]
    )

    useEffect(() => {
        fetch("./coins-list.json")
            .then(response => response.json())
            .then(data => {
                // let tokenList = data.map((tokenInfo: TokenInfo) => `${tokenInfo.symbol.toUpperCase()} | ${tokenInfo.name} | ${tokenInfo.id}`)
                setTokenList(data)
            })
    }, [])

    const validateSearch = () => {
        console.log("this is the search" + search)
        if (tokenList && search){
            tokenList?.map((token) => {
                if (token.id === search.id) { // Unneccary check because of the includeInputInList attribute in the search tag.
                    setToken(search.id);
                    return            
                }
            })
        }
    }



    return (
        <>
            {isLoading ? 
            <></> :
            <>
                <Autocomplete 
                    onChange={(_, value) => setSearch(value)}
                    disableClearable 
                     
                    includeInputInList
                    options={tokenList}
                    getOptionLabel={(option) => `${option.symbol.toUpperCase()} | ${option.name} | ${option.id}`}
                    renderInput={(params) => (
                        <TextField 
                            {...params} label="Search" 
                            id="search-input"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: 'search',
                                },
                            }}
                            
                        />        
                    )}
                />
                <Button onClick={validateSearch}>Search</Button>
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


export default CryptoChart