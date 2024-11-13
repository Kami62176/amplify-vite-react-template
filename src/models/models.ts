export class TokenInfo {
  id: string
  symbol: string
  name: string
  constructor(id: string = "bitcoin", symbol: string = "BTC", name: string = "Bitcoin") {
    this.id = id
    this.symbol = symbol
    this.name = name
  }
}

export class Dataset {
  date: Date[]
  price: number[];

  constructor(date: Date[] = [], price: number[] = []) {
    this.date = date
    this.price = price
  }
}

export class StrategyInfo {
  date: Date[]
  price: number[]
  equity: number[]
  totalTrades: number
  sharpie: number
  sortino: number
  omega: number
  maxDrawdown: number
  netProfit: number
  trades: Trade[]
  constructor(date: Date[], price: number[], equity: number[], totalTrades: number, 
    sharpie: number, sortino: number, omega: number, maxDrawdown: number, netProfit: number, trades: Trade[]) {
    this.date = date
    this.price = price
    this.equity = equity
    this.totalTrades = totalTrades
    this.netProfit = netProfit
    this.sharpie = sharpie
    this.sortino = sortino
    this.omega = omega
    this.maxDrawdown = maxDrawdown
    this.trades = trades
  }

}

export class Trade {
  action: string
  startDate: Date
  endDate: Date
  startPrice: number
  endPrice: number
  netProfit: number
  percentageChange: number
  startPortfolio: number
  endPortfolio: number
  constructor(action: string, startDate: Date, endDate: Date, startPrice: number, endPrice: number
    , netProfit: number, percentageChange: number, startPorfolio: number, endPorfolio: number
  ) {
    this.startDate = startDate
    this.endDate = endDate
    this.startPrice = startPrice
    this.startPortfolio = startPorfolio
    this.endPrice = endPrice
    this.endPortfolio = endPorfolio
    this.netProfit = netProfit
    this.percentageChange = percentageChange
    this.action = action
  }
}