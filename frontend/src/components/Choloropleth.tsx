import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { format } from "d3-format";

interface PopulationDataItem {
    country: string;
    continent: string;
    year: string;
    population: number;
}

const Choloropleth = () => {
    const [populationData, setPopulationData] = useState<PopulationDataItem[]>(
        []
    );
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

    const formatNumber = format(",");

    return (
        <div>
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
                    title: "World Map - Population",
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
