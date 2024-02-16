import jsonCountries from "./countries";
import React, { useEffect, useState } from "react";
import styles from "./Inputcomponent.module.scss";

// Definerer egenskapene til InputComponent
interface InputComponentProps {
    selectedOption: string[];
    onOptionChange: (selectedValue: string) => void;
}

// Definerer kontinenter som skal bli brukt i programmet
const continents = [
    { name: "Africa", value: "Africa" },
    { name: "Asia", value: "Asia" },
    { name: "Europe", value: "Europe" },
    { name: "North America", value: "North America" },
    { name: "Oceania", value: "Oceania" },
    { name: "South America", value: "South America" },
];

const InputComponent: React.FC<InputComponentProps> = ({
    selectedOption,
    onOptionChange,
}) => {
    // ulike useState funksjoner som blir brukt i løpet av programmet
    const [selectedContinent, setSelectedContinent] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [filteredCountries, setFilteredCountries] = useState(jsonCountries);

    // useEffekt som trigges når valgt kontinent endres
    useEffect(() => {
        const filteredCountries =
            selectedContinent == "whole_"
                ? jsonCountries
                : jsonCountries.filter(
                      (country) => country.continent === selectedContinent
                  );

        setFilteredCountries(filteredCountries);
        console.log(selectedOption);
    }, [selectedContinent]);

    // Funksjon for å håndtere endring av kontinent
    const handleContinentChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedContinent = event.target.value;
        setSelectedContinent(selectedContinent);
        onOptionChange(selectedContinent);
    };

    // Funksjon for å håndtere endring av land
    const handleCountryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
        onOptionChange(selectedCountry);
        console.log(selectedCountry);
    };

    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputRow}>
                <label htmlFor="continent">Kontinent</label>
                <select
                    name="continent"
                    id="continent"
                    value={selectedContinent}
                    onChange={handleContinentChange}
                >
                    <option value="whole_">Hele verden</option>
                    {continents.map((continent) => (
                        <option key={continent.value} value={continent.value}>
                            {continent.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.inputRow}>
                <label htmlFor="country">Land</label>
                <select
                    name="country"
                    id="country"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                >
                    <option value="all_">Se alle land...</option>
                    {filteredCountries.map((country) => (
                        <option key={country.cca3} value={country.country}>
                            {country.country}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default InputComponent;
