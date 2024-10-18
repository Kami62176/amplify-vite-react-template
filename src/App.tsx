import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";

import CryptoChart from "./components/CryptoChart";
import { Button, Typography } from "@mui/material";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
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
    <main>
      <Button variant="contained" onClick={signOut}>Sign out</Button>
      <Typography variant="h4">{user?.signInDetails?.loginId}'s todos</Typography>
      <CryptoChart/>
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

    </main>
  );
}

export default App;
