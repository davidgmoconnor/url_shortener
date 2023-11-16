import React, { useCallback, useState } from "react";
import "./App.css";
import { makeClient } from "./client";
import { List, Create } from "./pages";
import Text from "./components/Text";
import { ClientContext } from "./client/Context";

function App() {
  const baseUrl = process.env.REACT_APP_ENDPOINT;
  const client = makeClient("http://localhost:8080");
  const [stale, setStale] = useState(false);

  const toggleStale = () => setStale(!stale);

  return (
    <div className="App">
      <ClientContext.Provider value={client}>
        <Text variant="title">Primary Bid URL Shortener</Text>
        <Create onSuccess={toggleStale} />
        <List stale={stale} />
      </ClientContext.Provider>
    </div>
  );
}

export default App;
