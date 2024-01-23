import "./App.css";
import Choloropleth from "./components/Choloropleth";
import React from "react";
import InputComponent from "./components/InputComponent";

const App: React.FC = () => {
    return (
        <div className="grid-container">
            <div>
                <h2>Verdens befolkning</h2>
                <p>
                    Velg mellom å se befolkningsveksten til et land eller
                    kontinent
                </p>
                <InputComponent />
            </div>
            <div>
                <Choloropleth />
            </div>
        </div>
    );
};

export default App;
