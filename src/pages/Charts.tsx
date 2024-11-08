import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useRef, useState } from "react";

import { IconButton, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import CryptoChart from "../components/CryptoChart";
import VirtualizedAutoComplete from "../components/VirtualizedAutoComplete.tsx";
import Watchlist from "../components/Watchlist";
import AddIndicatorButton from '../components/AddIndicatorButton';
import ChartIndicators from '../components/IndicatorCharts';

import { Dataset, TokenInfo } from '../models/models';
import LeftNavBar from '../components/LeftNavBar.tsx';

export default function () {
    const { signOut } = useAuthenticator(); // user object was here

    const chartRef = useRef<HTMLDivElement>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Dataset>(new Dataset())
    const [token, setToken] = useState<string>("bitcoin")
    const [tokenList, setTokenList] = useState<TokenInfo[]>([])
    const [search, setSearch] = useState<TokenInfo | null>(null)
    const [indicatorDatasets, setIndicatorDatasets] = useState<Dataset[]>([])
    const [chartWidth, setChartWidth] = useState<number>(0)

    useEffect(() => {
        getTokenData(setLoading, token, setData)
    }, [token])

    useEffect(() => {
        getTokenList(setTokenList)
    }, ["never"])

    useEffect(() => {
        // this count is so that the watchlist can open
        const updateWidth = () => {
            // console.log("Width has been updated, Count: ", count)
            if (chartRef.current) {
                setChartWidth(chartRef.current.offsetWidth)
            }
        }
        updateWidth()

        const resizeObserver = new ResizeObserver(() => {
            updateWidth()
        })

        if (chartRef.current) {
            resizeObserver.observe(chartRef.current);
        }
        return () => {
            if (chartRef.current) {
                resizeObserver.unobserve(chartRef.current);
            }
            resizeObserver.disconnect();
        };
    })

    return (
        <>
            <header className='search-bar'>
                <Stack direction="row" sx={{ padding: "0px", margin: 0, borderRadius: 0 }}>
                    <VirtualizedAutoComplete setSearch={setSearch} />
                    <IconButton
                        onClick={() => { validateSearch(search, tokenList, setToken) }}
                        disabled={isLoading}
                        color='white'
                        size='medium'
                    >
                        <SearchIcon />
                    </IconButton>
                    <AddIndicatorButton indicatorDatasets={indicatorDatasets} data={data} setIndicatorDatasets={setIndicatorDatasets} />
                </Stack>
            </header>
            <main className='main-page'>
                <LeftNavBar />

                <div ref={chartRef} className='chart-block'>
                    <CryptoChart token={tokenList.find(coin => coin.id === token)?.symbol || ""} data={data} width={chartWidth} />
                    <ChartIndicators datasets={indicatorDatasets} width={chartWidth} />
                </div>
                <div className='datalist-block'>
                    <Watchlist setToken={setToken} />
                </div>
                <div className='sidebar right'>
                    <IconButton onClick={signOut} color='logout'>
                        <LogoutIcon />
                    </IconButton>
                </div>
            </main>
        </>
    )
}


function validateSearch(search: TokenInfo | null, tokenList: TokenInfo[], setToken: React.Dispatch<React.SetStateAction<string>>) {
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
        const response = await fetch(`http://localhost:3000/token/data/${token}`, options)
        const body = await response.json()

        let dataset = new Dataset()

        dataset.price = body.price
        dataset.date = body.date

        setData(dataset)
    } catch (err) {
        console.error(err)
    } finally {
        setLoading(false)
    }
}