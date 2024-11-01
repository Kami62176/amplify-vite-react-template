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

import { Dataset, TokenInfo } from './models/models';

export default function App() {
  const { signOut } = useAuthenticator(); // user object was here

  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Dataset>(new Dataset())
  const [token, setToken] = useState<string>("bitcoin")
  const [tokenList, setTokenList] = useState<TokenInfo[]>([])
  const [search, setSearch] = useState<TokenInfo | null>(null)
  const [indicatorDatasets, setIndicatorDatasets] = useState<Dataset[]>([])

  useEffect(() => {
    getTokenData(setLoading, token, setData)
  },
    [token]
  )

  useEffect(() => {
    getTokenList(setTokenList)
  }, ["never"])

  return (
    <>
      <header>
        <Stack direction="row" sx={{ padding: "0px", margin: 0, borderRadius: 0 }}>
          <VirtualizedAutoComplete OPTIONS={tokenList} setSearch={setSearch} />
          <IconButton
            onClick={() => { validateSearch(search, tokenList, setToken) }}
            disabled={isLoading}
            color='primary'
            size='large'

          >
            <SearchIcon />
          </IconButton>
          <AddIndicatorButton indicatorDatasets={indicatorDatasets} data={data} setIndicatorDatasets={setIndicatorDatasets} />
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
          <IconButton onClick={signOut} sx={{ backgroundColor: "#707e8f" }}>
            <LogoutIcon />
          </IconButton>
        </div>
      </main>
    </>
  );
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

async function getTokenList(setTokenList: React.Dispatch<React.SetStateAction<TokenInfo[]>>) {
  try {
    const response = await fetch("http://localhost:3000/token/list")
    const data = await response.json()
    setTokenList(data)
  } catch (err) {
    console.error(err)
  }
}

async function getTokenData(setLoading: React.Dispatch<React.SetStateAction<boolean>>, token: string, setData: React.Dispatch<React.SetStateAction<Dataset>>) {
  setLoading(true)
  try {
    const options = {
      method: 'GET'
    };
    console.log("Getting token data from " + token)
    const response = await fetch(`http://localhost:3000/token/data/${token}`, options)
    const body = await response.json()

    let dataset = new Dataset()

    dataset.price = body.price
    dataset.date = body.date

    console.log(dataset)
    setData(dataset)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}



