import "./App.css";
import Choloropleth from "./components/Choloropleth";
import React, { useEffect, useState } from "react";
import jsonCountries from "./components/countries";

const continents = [
    { name: "Africa", value: "Africa" },
    { name: "Asia", value: "Asia" },
    { name: "Europe", value: "Europe" },
    { name: "North America", value: "North America" },
    { name: "Oceania", value: "Oceania" },
    { name: "South America", value: "South America" },
];

const App: React.FC = () => {
    const [selectedContinent, setSelectedContinent] = useState<string>("");
    const [filteredCountries, setFilteredCountries] = useState(jsonCountries);

    useEffect(() => {
        // Filter countries based on the selected continent
        const filteredCountries = selectedContinent
            ? jsonCountries.filter(
                  (country) => country.continent === selectedContinent
              )
            : jsonCountries;

        setFilteredCountries(filteredCountries);
    }, [selectedContinent]);

    const handleContinentChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedContinent = event.target.value;
        setSelectedContinent(selectedContinent);
        console.log(selectedContinent);
    };

    return (
        <div className="grid-container">
            <div>
                <h2>Verdens befolkning</h2>
                <p>
                    Velg mellom å se befolkningsveksten til et land eller
                    kontinent
                </p>
                <div className="inputContainers">
                    <label htmlFor="continent">Kontinent</label>
                    <select
                        name="continent"
                        id="continent"
                        value={selectedContinent}
                        onChange={handleContinentChange}
                    >
                        <option value="" disabled>
                            Kontinent...
                        </option>
                        {continents.map((continent) => (
                            <option
                                key={continent.value}
                                value={continent.value}
                            >
                                {continent.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="country">Land</label>
                    <select name="country" id="country">
                        <option value="" disabled>
                            Land...
                        </option>
                        {filteredCountries.map((country) => (
                            <option key={country.cca3} value={country.cca3}>
                                {country.country}
                            </option>
                        ))}
                    </select>
                    <button>Se data</button>
                </div>
            </div>
            <div>
                <Choloropleth />
            </div>
        </div>
    );
};

export default App;
