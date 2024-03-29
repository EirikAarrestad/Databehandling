import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { format } from "d3-format";

// TypeScript interface som viser hva ulike variabler sine typer skal være
interface PopulationDataItem {
    country: string;
    continent: string;
    year: string;
    population: number;
}

const Choloropleth: React.FC = ({}) => {
    const [populationData, setPopulationData] = useState<PopulationDataItem[]>(
        []
    );

    // UseEffect hook for å hente befolkningsdata med axios, bruker deretter useState for å large dataene
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/get_population_data"
                );
                setPopulationData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Lager en formateringsfunksjon med d3-format biblioteket
    const formatNumber = format(",");

    return (
        <div className="continents">
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
                        projection_type: "natural earth",
                        showcoastlines: true,
                        showcountries: true,
                        showocean: true,
                        oceancolor: "LightBlue",
                    },
                    title: "Verdenskart - Befolkning",
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

export default Choloropleth;
