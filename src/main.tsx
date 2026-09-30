import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Ingen SpringApplication.run(...) här - detta ÄR din "main". Ingen
// application context byggs upp; det enda som händer är att React
// monteras in i <div id="root"> från index.html.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
