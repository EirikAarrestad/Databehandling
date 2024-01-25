import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { format } from "d3-format";

interface CountryGrowthProps {
    country: string;
}

const CountryGrowth: React.FC<CountryGrowthProps> = ({ country }) => {
    const [data, setData] = useState<number>();

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

    const formatNumber = format(",");
    console.log(data);

    if (!data) {
        return;
    }

    return (
        <div>
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
                    title: `Population Growth of ${country} Over the Years`,
                    xaxis: { title: "Year" },
                    yaxis: { title: "Population" },
                }}
            />
        </div>
    );
};

export default CountryGrowth;
