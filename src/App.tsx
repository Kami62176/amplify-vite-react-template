import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from "react";

import { IconButton, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

import CryptoChart from "./components/CryptoChart";
import VirtualizedAutoComplete from "./components/TokenSearchField";
import Watchlist from "./components/Watchlist";
import AddIndicatorButton from './components/AddIndicatorButton';
import ChartIndicators from './components/IndicatorCharts';

export default function App() {
  const { signOut } = useAuthenticator(); // user object was here

  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Dataset>(new Dataset())
  const [token, setToken] = useState<string>("bitcoin")
  const [tokenList, setTokenList] = useState<TokenInfo[]>([])
  const [search, setSearch] = useState<TokenInfo | null>(null)
  const [indicatorDatasets, setIndicatorDatasets] = useState<Dataset[]>([])

  useEffect(() => {
    retreiveCryptoData(setLoading, token, setData)
  },
    [token]
  )

  useEffect(() => {
    fetch("./coins-list.json")
      .then(response => response.json())
      .then(data => {
        setTokenList(data)
      })
  }, ["never"])

  return (
    <>
      <header>
        <Stack direction="row" sx={{ padding: "0px", margin: 0, borderRadius: 0}}>
          <VirtualizedAutoComplete OPTIONS={tokenList} setSearch={setSearch} />
          <IconButton 
            onClick={() => { validateSearch(search, tokenList, setToken) }} 
            disabled={isLoading}
            color='primary'
            size='large'
            
            >
            <SearchIcon/>
          </IconButton>
          <AddIndicatorButton indicatorDatasets={indicatorDatasets} data={data} setIndicatorDatasets={setIndicatorDatasets}/>
        </Stack>
      </header>
      <main className='chart-page'>
        <div className='chart-block'>
          {/* <Typography variant="h4">{user?.signInDetails?.loginId}'s todos</Typography> */}
          
            <CryptoChart data={data} />
            <ChartIndicators datasets={indicatorDatasets} />

        </div>
        <div className='datalist-block'>
          <Watchlist setToken={setToken} />
        </div>
        <div className='sidebar'>
          <IconButton  onClick={signOut} sx={{ backgroundColor: "#707e8f" }}>
            <LogoutIcon/>    
          </IconButton>
        </div>
      </main>
    </>
  );
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

class Dataset {
  date: Date[]
  price: number[];

  constructor(date: Date[] = [], price: number[] = []) {
    this.date = date
    this.price = price
  }
}

function validateSearch(search: TokenInfo | null, tokenList: TokenInfo[], setToken: React.Dispatch<React.SetStateAction<string>>) {
  console.log("this is the search" + search)
  if (tokenList && search) {
    tokenList?.map((token) => {
      if (token.id === search.id) { // Unneccary check because of the includeInputInList attribute in the search tag.
        setToken(search.id);
        return
      }
    })
  }
}

async function retreiveCryptoData(setLoading: React.Dispatch<React.SetStateAction<boolean>>, token: string, setData: React.Dispatch<React.SetStateAction<Dataset>>) {
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
  } catch (err) {

  } finally {
    setLoading(false)
  }
}



