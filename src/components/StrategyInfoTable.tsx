import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StrategyInfo } from '../models/models';

interface TableProps {
    strategyInfo: StrategyInfo | null
}

export default function ({ strategyInfo }: TableProps) {
    console.log(strategyInfo)
    return (
        <>{strategyInfo ?
            <>
                <TableContainer component={Paper} sx={{
                    marginBottom: 3
                }}>
                    <Table >
                        <TableHead>

                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Equity Max Drowdown:</TableCell>
                                <TableCell align='right'>{(strategyInfo.maxDrawdown * 100).toFixed(2)}%</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Sharpie:</TableCell>
                                <TableCell align='right' >{strategyInfo.sharpie.toFixed(3)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Sortino:</TableCell>
                                <TableCell align='right'>{strategyInfo.sortino.toFixed(3)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Omega:</TableCell>
                                <TableCell align='right'>{strategyInfo.omega.toFixed(3)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Net Profit%: </TableCell>
                                <TableCell align="right">{(strategyInfo.netProfit * 100).toFixed(2)}%</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Trades:</TableCell>
                                <TableCell align='right'>{strategyInfo.totalTrades}</TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>

                </TableContainer>
                <TableContainer component={Paper} sx={{
                    maxHeight: 300
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableCell align='left'>Action</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Start Price</TableCell>
                            <TableCell>End Price</TableCell>
                            <TableCell>Equity</TableCell>
                            <TableCell>% Change</TableCell>
                        </TableHead>
                        <TableBody>
                            {strategyInfo.trades.map((trade, i) => {
                                let startDate = new Date(trade.startDate).toLocaleDateString()
                                let endDate = new Date(trade.endDate).toLocaleDateString()
                                return (
                                    <TableRow key={i}>
                                        <TableCell align='left'>{trade.action.toUpperCase()}</TableCell>
                                        <TableCell>{startDate}</TableCell>
                                        <TableCell>{endDate}</TableCell>
                                        <TableCell>{trade.startPrice.toFixed(2)}</TableCell>
                                        <TableCell>{trade.endPrice.toFixed(2)}</TableCell>
                                        <TableCell>{trade.endPortfolio.toFixed(2)}</TableCell>
                                        <TableCell>{(trade.percentageChange * 100).toFixed(1)}%</TableCell>
                                        
                                    </TableRow>
                                )
                            }
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
            : <></>}
        </>
    )
}