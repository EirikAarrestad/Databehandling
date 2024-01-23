import "../App.css";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

interface ChartItem {
    continent: string;
    Population: number;
}

const Barchart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartItem[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/chart_data")
            .then((response) => setChartData(response.data))
            .catch((error) =>
                console.error("Error fetching chart data:", error)
            );
    }, []);

    return (
        <div>
            {chartData.length > 0 ? (
                <Plot
                    data={[
                        {
                            x: chartData.map((item) => item.continent),
                            y: chartData.map((item) => item.Population),
                            type: "bar",
                        },
                    ]}
                    layout={{
                        title: "Population by Continent",
                        height: 400,
                        width: 800,
                        xaxis: { title: "Continent" },
                        yaxis: { title: "Population" },
                    }}
                />
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Barchart;
