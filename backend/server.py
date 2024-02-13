import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

# Bruker flask serverer til en backsend som kan behandle dataene fra .CSV filen og fra frontenden
# Tillater Cross Origin Resource Sharing (CORS) så vi kan sende data mellom servere
app = Flask(__name__)
CORS(app)


def load_data(filename):
    """
    Load data from a CSV file.

    Parameters:
    - filename (str): The path to the CSV file.

    Returns:
    - pd.DataFrame: Loaded DataFrame from the CSV file.
    """
    df = pd.read_csv(filename)
    return df


def preprocess_data(df):
    """
    Preprocess the data by grouping and aggregating population data.

    Parameters:
    - df (pd.DataFrame): The original DataFrame.

    Returns:
    - pd.DataFrame: Processed DataFrame with grouped and aggregated population data.
    """
    cols = df.columns[4:13]
    df_processed = (
        df.groupby(["country", "continent"])[cols].sum().stack().reset_index()
    )
    df_processed.columns = ["country", "continent", "year", "population"]
    df_processed["year"] = df_processed["year"].str[0:4]
    df_processed["year"] = pd.to_datetime(df_processed["year"], format="%Y")
    return df_processed


def filter_data_by_year(df, target_year):
    """
    Filter data based on a target year.

    Parameters:
    - df (pd.DataFrame): The DataFrame to filter.
    - target_year (str): The target year for filtering.

    Returns:
    - pd.DataFrame: Filtered DataFrame for the target year.
    """
    return df.query(f"year=='{target_year}'")


@app.route("/continent_growth")
def get_continent_growth_data():
    """
    Retrieve continent growth data.

    Returns:
    - jsonify: JSON response containing aggregated continent growth data.
    """
    chart_data = (
        df.groupby("continent")[
            [
                "2023",
                "2022",
                "2020",
                "2015",
                "2010",
                "2000",
                "1990",
                "1980",
                "1970",
            ]
        ]
        .sum()
        .reset_index()
        .to_dict(orient="records")
    )
    return jsonify(chart_data)


@app.route("/country_growth")
def country_growth_data():
    """
    Retrieve country growth data.

    Returns:
    - jsonify: JSON response containing aggregated country growth data.
    """
    country = request.args.get("country")

    country_data = (
        df[df["country"] == country][
            [
                "2023",
                "2022",
                "2020",
                "2015",
                "2010",
                "2000",
                "1990",
                "1980",
                "1970",
            ]
        ]
        .sum()
        .to_dict()
    )

    return jsonify(country_data)


@app.route("/get_population_data")
def get_population_data():
    """
    Retrieve population data for the specified year.

    Returns:
    - jsonify: JSON response containing population data.
    """
    data = df_filtered.to_dict(orient="records")
    return jsonify(data)


@app.route("/get_country_population_data")
def get_country_population_data():
    """
    Retrieve population data for the specified continent and the year 2023.

    Returns:
    - jsonify: JSON response containing population data for the specified continent and year 2023.
    """
    continent = request.args.get("continent")

    filtered_data = df_processed[
        (df_processed["continent"] == continent) & (df_processed["year"] == "2023")
    ].to_dict(orient="records")

    return jsonify(filtered_data)


if __name__ == "__main__":
    data_filename = "world_population_data.csv"
    df = load_data(data_filename)

    df_processed = preprocess_data(df)

    target_year = "2023-01-01"
    df_filtered = filter_data_by_year(df_processed, target_year)

    app.run(debug=True)
