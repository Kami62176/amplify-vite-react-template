import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

import { AppBar, Button, Container } from "@mui/material";

import CryptoChart from "./components/CryptoChart";
import VirtualizedAutoComplete from "./components/TokenSearchField";
import Watchlist from "./components/Watchlist";


const client = generateClient<Schema>();

export default function App() {
  const { signOut } = useAuthenticator(); // user object was here

  const [isLoading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Dataset>(new Dataset())
  const [token, setToken] = useState<string>("bitcoin")
  const [tokenList, setTokenList] = useState<TokenInfo[]>([])
  const [search, setSearch] = useState<TokenInfo | null>(null)


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



  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }



  return (
    <>
      <AppBar position={"static"} sx={{ padding: 1, borderRadius: 2, backgroundColor: "#383f47" }}>
        <Button variant="contained" onClick={signOut} sx={{ width: 100, backgroundColor: "#707e8f" }}>Sign out</Button>
      </AppBar>
      <Container >
        {/* <Typography variant="h4">{user?.signInDetails?.loginId}'s todos</Typography> */}
        <VirtualizedAutoComplete OPTIONS={tokenList} setSearch={setSearch} />
        <Button variant="outlined" onClick={() => { validateSearch(search, tokenList, setToken) }} disabled={isLoading}>Search</Button>
        <CryptoChart data={data} />
      </Container>
      <Container>
        <Watchlist setToken={setToken} />
      </Container>

      {/* Tutorial stuff */}
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>


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



