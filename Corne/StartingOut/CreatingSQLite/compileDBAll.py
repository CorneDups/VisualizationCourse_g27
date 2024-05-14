import pandas as pd
import sqlite3
import os

# Set the directory containing the CSV files
directory = 'C:/Users/u0164160/OneDrive - KU Leuven/Documents/GitHub/suncharge/dataToDB'

# Create an SQLite database
db_path = os.path.join(directory, 'allSunChargeData.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Function to create a table name from a filename
def create_table_name(file_name):
    return file_name.replace('.CSV', '').replace('.csv', '').lower()

# Iterate over each file in the directory
for file_name in os.listdir(directory):
    if file_name.endswith('.csv') or file_name.endswith('.CSV'):
        file_path = os.path.join(directory, file_name)
        data = pd.read_csv(file_path)

        # Remove any unnecessary index columns if present
        data = data.drop(columns=[data.columns[0]], errors='ignore')

        # Create a table name based on the file name
        table_name = create_table_name(file_name)

        # Define and create a table in the database
        create_table_query = f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
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
        data.to_sql(table_name, conn, if_exists='replace', index=False, index_label='id')

        # Verify that the data was imported correctly
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
        imported_data = cursor.fetchall()
        print(f"Data from {file_name}:")
        for row in imported_data:
            print(row)

# Close the connection to the database
conn.close()
