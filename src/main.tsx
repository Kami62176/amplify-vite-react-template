import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";

import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

import { ThemeProvider } from "@mui/material";
import theme from "./theme.tsx";


Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Authenticator>
  </React.StrictMode>
);
