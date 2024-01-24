import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContinentGrowth from "./components/ContinentGrowth.tsx";
import CountryGrowth from "./components/CountryGrowth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CountryGrowth country="Albania" />
    </React.StrictMode>
);
