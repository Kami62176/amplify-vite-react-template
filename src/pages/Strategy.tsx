import { Box, Button, Stack, TextField } from "@mui/material";
import LeftNavBar from "../components/LeftNavBar";
import VirtualizedAutoComplete from "../components/VirtualizedAutoComplete";
import { useEffect, useRef, useState } from "react";
import { StrategyInfo, TokenInfo } from "../models/models";
import StrategyInfoTable from "../components/StrategyInfoTable";
import StrategyChart from "../components/StrategyChart";


export default function () {
    const chartRef = useRef<HTMLDivElement>(null)
    const [selection, setSelection] = useState<TokenInfo | null>({ name: "Bitcoin", id: "bitcoin", symbol: "btc" })
    const [length, setLength] = useState<string>("14")
    const [data, setStrategyInfo] = useState<StrategyInfo | null>(null)
    const [chartWidth, setChartWidth] = useState<number>(0)
    const [tablesWidth, setTablesWidth] = useState<number>(0)
    const [displayType, setDisplayType] = useState<string>("")
    const [displayMargin, setDisplayMargin] = useState<number>()
    const [rightValue, setRightValue] = useState<string>("0")

    async function getRsiStrat() {
        try {
            const options = {
                method: "GET"
            }
            const response = await fetch(`http://localhost:3001/strategy/${selection?.id}/rsi/${length}`, options)
            const body = await response.json()

            let strategyInfo = new StrategyInfo(body.date, body.price, body.equity, body.totalTrades,
                body.sharpie, body.sortino, body.omega, body.maxDrawdown, body.netProfit, body.trades
            )


            setStrategyInfo(strategyInfo)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        // this count is so that the watchlist can open
        const updateWidth = () => {
            if (chartRef.current) {
                console.log(`Window inner width: ${window.innerWidth}, Outer width: ${window.outerWidth}`)
                let width = window.innerWidth
                if (width > 1060) {
                    setChartWidth(width * 0.6)//chartRef.current.offsetWidth)
                    setTablesWidth(width * 0.4)
                    setDisplayType("flex")
                    setDisplayMargin(0)
                    setRightValue("0")
                } else {
                    setChartWidth(width * 0.96)
                    setTablesWidth(width * 0.80)
                    setDisplayType("")
                    setDisplayMargin(4)
                    setRightValue("1%")
                }
            }
        }

        updateWidth()

        window.addEventListener('resize', updateWidth)

        return () => {
            window.removeEventListener('resize', updateWidth)
        };
    })


    return (
        <>
            <header className="search-bar">
                <Stack direction={"row"} spacing={1} sx={{ padding: 1 }} className="strategyheader">
                    <VirtualizedAutoComplete setSearch={setSelection} />
                    <TextField
                        sx={{ color: "white" }}
                        label="Length"
                        type="number"
                        defaultValue={14}
                        onChange={(event) => setLength(event.target.value)}
                    />
                    <Button variant="outlined" color="white" sx={{ margin: 1 }} onClick={() => getRsiStrat()}>Submit</Button>
                </Stack>
            </header>
            <Box sx={{
                padding: 0,
                margin: displayMargin,
                display: displayType,
                marginTop: "5px",
                minHeight: "100vh",
            }}>
                <LeftNavBar />
                <Box ref={chartRef} sx={{
                    position: "relative",
                    width: chartWidth,
                    transition: "width 0.1s ease",
                    right: rightValue
                }}>
                    {data ?
                        <StrategyChart selection={selection} data={data} width={chartWidth} /> :
                        <></>
                    }
                </Box>
                <Box sx={{
                    width: tablesWidth,
                    transition: "width 0.1s ease",
                    margin: "5%"
                }}>
                    <StrategyInfoTable strategyInfo={data} />
                </Box>


            </Box>
        </>
    )
}

