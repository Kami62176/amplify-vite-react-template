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
  "total-trades": number
  sharpie: number
  sortino: number
  omega: number
  "max-drawdown": number
  trades: Trade[]
  constructor(date: Date[], price: number[], equity: number[], totalTrades: number, sharpie: number, sortino: number, omega: number, maxDrawdown: number, trades: Trade[]) {
    this.date = date
    this.price = price
    this.equity = equity
    this["total-trades"] = totalTrades
    this.sharpie = sharpie
    this.sortino = sortino
    this.omega = omega
    this["max-drawdown"] = maxDrawdown
    this.trades = trades
  }

}

export class Trade {
  date: Date
  action: string
  constructor(date: Date, action: string) {
    this.date = date
    this.action = action
  }
}