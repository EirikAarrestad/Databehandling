import { useEffect, useState } from "react";
import "../App.css";
import Plot from "react-plotly.js";
import axios from "axios";
import { format } from "d3-format";

// Interface for dataen som kommer fra http forespørselen
interface PopulationData {
    country: string;
    population: number;
}

// Interface for props for grafen
interface ContinentCholoroplethProps {
    continent: string;
}

const ContinentCholoropleth: React.FC<ContinentCholoroplethProps> = (
    continent
) => {
    const [populationData, setPopulationData] = useState<PopulationData[]>([]);

    // UseEffect hook som henter befolkningsdata fra et valgt land.
    // Det sendes en ny http request når "continent" variablen blir endret.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/get_country_population_data",
                    {
                        params: {
                            continent: continent.continent,
                        },
                    }
                );
                setPopulationData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [continent]);

    // Lager en formateringsfunksjon med d3-format biblioteket
    const formatNumber = format(",");

    return (
        <div className="continentContainer">
            <Plot
                data={[
                    {
                        type: "choropleth",
                        locations: populationData.map((item) => item.country),
                        locationmode: "country names",
                        z: populationData.map((item) => item.population),
                        text: populationData.map(
                            (item) =>
                                `${item.country}: ${formatNumber(
                                    item.population
                                )}`
                        ),
                        hoverinfo: "text",
                        hovertemplate: "<b>%{text}</b><extra></extra>",
                        marker: {
                            line: {
                                color: "#1a1a1a",
                                width: 1,
                            },
                        },
                        colorscale: "Rainbow",
                    },
                ]}
                layout={{
                    geo: {
                        scope: continent.continent.toLowerCase(),
                        resolution: 50,
                    },
                    title: "Befolkningskart",
                    hovermode: "closest",
                    paper_bgcolor: "#1a1a1a",
                    font: {
                        color: "white",
                        family: "Work Sans, sans-serif",
                    },
                }}
            />
        </div>
    );
};

export default ContinentCholoropleth;
