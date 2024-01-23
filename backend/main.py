import csv
import json

countries_list = []


def print_countries(csv_file):
    with open(csv_file, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            country_info = {
                "country": row["country"],
                "cca3": row["cca3"],
                "continent": row["continent"],
            }
            countries_list.append(country_info)


# Replace 'your_file.csv' with the actual file name.
csv_file_path = "backend\world_population_data.csv"
print_countries(csv_file_path)

# Specify the output JSON file name
json_file_path = "backend/outputdata.json"

# Write the JSON data to a .json file
with open(json_file_path, "w") as json_file:
    json.dump(countries_list, json_file, indent=2)

print(f"JSON data written to {json_file_path}")
