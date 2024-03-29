import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { format } from "d3-format";
import "../App.css";

interface CountryGrowthProps {
    country: string;
}

const CountryGrowth: React.FC<CountryGrowthProps> = ({ country }) => {
    const [data, setData] = useState<number>();

    // UseEffect hook som henter vekst med land som parameter
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/country_growth",
                    {
                        params: {
                            country: country,
                        },
                    }
                );

                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [country]);

    // Lager en formateringsfunksjon med d3-format biblioteket
    const formatNumber = format(",");

    if (!data) {
        return;
    }

    return (
        <div className="continentContainer">
            <Plot
                data={[
                    {
                        type: "scatter",
                        mode: "lines",
                        name: "India",
                        x: Object.keys(data),
                        y: Object.values(data),
                        hoverinfo: "x",
                        hovertemplate: "<b>%{text}</b><extra></extra>",
                        text: Object.values(data).map((value) =>
                            formatNumber(value)
                        ),
                    },
                ]}
                layout={{
                    title: `Befolkningsvekst fra ${country}`,
                    xaxis: { title: "Year" },
                    yaxis: { title: "Population" },
                }}
            />
        </div>
    );
};

export default CountryGrowth;
