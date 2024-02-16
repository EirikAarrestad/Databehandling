import { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { format } from "d3-format";

// Interface for hvilke typer befolkningdata-variablene skal ha
interface PopulationData {
    continent: string;
    populations: Record<string, number>;
}

const ContinentGrowth = () => {
    const [data, setData] = useState<PopulationData[]>([]);

    // UseEffect hook som henter data for å vise befolkningsvekst fra 1970-2020
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/continent_growth"
                );

                const newData = [];
                for (let index = 0; index < 5; index++) {
                    newData.push({
                        continent: response.data[index]["continent"],
                        populations: {
                            "2020": response.data[index]["2020"],
                            "2010": response.data[index]["2010"],
                            "2000": response.data[index]["2000"],
                            "1990": response.data[index]["1990"],
                            "1980": response.data[index]["1980"],
                            "1970": response.data[index]["1970"],
                        },
                    });
                }

                setData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Lager en formateringsfunksjon med d3-format biblioteket
    const formatNumber = format(",");

    return (
        <div>
            <Plot
                data={data.map((item) => ({
                    type: "scatter",
                    mode: "lines",
                    name: item.continent,
                    x: Object.keys(item.populations),
                    y: Object.values(item.populations),
                    hoverinfo: "x",
                    hovertemplate: "<b>%{text}</b><extra></extra>",
                    text: Object.values(item.populations).map((value) =>
                        formatNumber(value)
                    ),
                }))}
                layout={{
                    title: "Befolkningsvekst",
                    xaxis: { title: "År" },
                    yaxis: { title: "Befolkning" },
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

export default ContinentGrowth;
