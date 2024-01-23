import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

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


@app.route("/api/chart_data")
def get_chart_data():
    """
    Retrieve aggregated chart data for the specified year.

    Returns:
    - jsonify: JSON response containing aggregated chart data.
    """
    chart_data = (
        df.groupby("continent")["2023 population"]
        .sum()
        .reset_index(name="Population")
        .to_dict(orient="records")
    )
    return jsonify(chart_data)


@app.route("/get_population_data")
def get_population_data():
    """
    Retrieve population data for the specified year.

    Returns:
    - jsonify: JSON response containing population data.
    """
    data = df_filtered.to_dict(orient="records")
    return jsonify(data)


if __name__ == "__main__":
    data_filename = "world_population_data.csv"
    df = load_data(data_filename)

    df_processed = preprocess_data(df)

    target_year = "2023-01-01"
    df_filtered = filter_data_by_year(df_processed, target_year)

    app.run(debug=True)
