import React from "react";
import "./App.css";
require("dotenv").config();
import { makeClient } from "./client";

function App() {
  const baseUrl = process.env.api_endpoint;
  const client = makeClient(baseUrl ?? "");

  const query = `
        query GetLinks($start: Float!, $end: Float!, $filter: String) {
            getLinks(start: $start, end: $end, filter: $filter) {
              items {
                url
                shortFormUrl
              }
              total
            }
        }
    `;

  const data = client.makeRequest(query, { start: 0, end: 8 });
  console.log({ data });

  return (
    <div className="App">
      <header className="App-header">SSomething</header>
    </div>
  );
}

export default App;
