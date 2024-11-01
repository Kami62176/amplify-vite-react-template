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