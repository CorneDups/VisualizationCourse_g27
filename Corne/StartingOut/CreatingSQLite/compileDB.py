# import pandas as pd

# # Load the CSV file to examine its structure
# file_path = 'C:/Users/u0164160/OneDrive - KU Leuven/Documents/GitHub/suncharge/data/Materials.CSV'

# data = pd.read_csv(file_path)

# # Display the first few rows of the dataframe and the column names
# data.head(), data.columns
# print(data)

import pandas as pd
import sqlite3

# Load the CSV file
file_path = 'C:/Users/u0164160/OneDrive - KU Leuven/Documents/GitHub/suncharge/data/Materials.CSV'
data = pd.read_csv(file_path)

# Remove any unnecessary index columns if present
data = data.drop(columns=[data.columns[0]], errors='ignore')

# Create an SQLite database
db_path = 'C:/Users/u0164160/OneDrive - KU Leuven/Documents/GitHub/suncharge/data/Materials.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Define and create a table in the database
create_table_query = '''
CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    material TEXT,
    material_key INTEGER,
    material_type TEXT,
    material_description TEXT,
    product_category TEXT,
    component TEXT
);
'''
cursor.execute(create_table_query)

# Import data from CSV into the SQLite table
data.to_sql('materials', conn, if_exists='replace', index=False, index_label='id')

# Verify that the data was imported correctly
cursor.execute("SELECT * FROM materials LIMIT 5;")
imported_data = cursor.fetchall()
for row in imported_data:
    print(row)

# Close the connection to the database
conn.close()