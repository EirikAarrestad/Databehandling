import "./App.css";
import React, { useState } from "react";
import InputComponent from "./components/InputComponent";
import ContinentCholoropleth from "./components/ContinentCholoropleth";
import CountryGrowth from "./components/CountryGrowth";
import Slideshow from "./components/Slideshow";

const App: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    // Funksjon for å håndtere endringer i valg
    const handleOptionChange = (selectedValue: string) => {
        setSelectedOptions((prevSelectedOptions) => [
            ...prevSelectedOptions,
            selectedValue,
        ]);
    };

    // Mulige kontinenter
    // er er all_ alle land
    // og whole_ hele verden
    const continents = [
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "North America",
        "Oceania",
        "South America",
        "all_",
        "whole_",
    ];

    // Funksjon for å håndtere knappetrykk
    const handleButtonClick = () => {
        const lastSelectedOption = selectedOptions[selectedOptions.length - 1];

        setSelectedCountry(lastSelectedOption);
        console.log("Selected Country:", selectedCountry);
    };

    // Sjekk om det valgte landet er en kontinent
    const isContinent = (country: string): boolean => {
        return continents.includes(country);
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
                {selectedCountry ? (
                    selectedCountry === "whole_" ||
                    selectedCountry === "all_" ||
                    !selectedCountry ? (
                        <Slideshow />
                    ) : isContinent(selectedCountry) ? (
                        <ContinentCholoropleth continent={selectedCountry} />
                    ) : (
                        <CountryGrowth country={selectedCountry} />
                    )
                ) : (
                    <Slideshow />
                )}
            </div>
        </div>
    );
};

export default App;
