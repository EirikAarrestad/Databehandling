import "./App.css";
import Choloropleth from "./components/Choloropleth";
import React, { useState } from "react";
import InputComponent from "./components/InputComponent";
import ContinentCholoropleth from "./components/CountryC";

const App: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionChange = (selectedValue: string) => {
        setSelectedOptions((prevSelectedOptions) => [
            ...prevSelectedOptions,
            selectedValue,
        ]);
    };
    const handleButtonClick = () => {
        console.log(
            "Selected Options:",
            selectedOptions[selectedOptions.length - 1]
        );
    };

    return (
        <div className="grid-container">
            <div>
                <h2>Verdens befolkning</h2>
                <p>
                    Velg mellom å se befolkningsveksten til et land eller
                    kontinent
                </p>
                <InputComponent
                    selectedOption={selectedOptions}
                    onOptionChange={handleOptionChange}
                />
                <button onClick={handleButtonClick}>Se data</button>
            </div>
            <div>
                {selectedOptions.length > 0 ? (
                    selectedOptions[selectedOptions.length - 1] === "whole_" ? (
                        <Choloropleth />
                    ) : (
                        <ContinentCholoropleth
                            continent={
                                selectedOptions[selectedOptions.length - 1]
                            }
                        />
                    )
                ) : (
                    <Choloropleth />
                )}
            </div>
        </div>
    );
};

export default App;
