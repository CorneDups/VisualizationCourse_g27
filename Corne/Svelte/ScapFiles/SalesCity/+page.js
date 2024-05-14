import csvParser from 'csv-parser';

import fs from 'fs';
import csv from 'csv-parser';

const salesData = {};

fs.createReadStream('data/Sales.csv')
  .pipe(csv())
  .on('data', (row) => {
    const customerKey = row.CustomerKey;
    const quantity = parseFloat(row.OrderQuantity);
    if (salesData[customerKey]) {
      salesData[customerKey] += quantity;
    } else {
      salesData[customerKey] = quantity;
    }
  })
  .on('end', () => {
    console.log('Sales data loaded and aggregated:', salesData);
    matchCustomerKey();
  });

  const customersData = {};

fs.createReadStream('data/Customers.csv')
  .pipe(csv())
  .on('data', (row) => {
    const customerKey = row.CustomerKey;
    if (salesData[customerKey]) {
      const city = row.CustomerCity;
      if (customersData[city]) {
        customersData[city] += salesData[customerKey];
      } else {
        customersData[city] = salesData[customerKey];
      }
    }
  })
  .on('end', () => {
    console.log('Customer sales by city:', customersData);
    addCoordinates();
  });

  const cityLocations = {};

fs.createReadStream('data/extractedCityLocations.csv')
  .pipe(csv())
  .on('data', (row) => {
    cityLocations[row.CustomerCity] = {
      latitude: row.Latitude,
      longitude: row.Longitude
    };
  })
  .on('end', () => {
    Object.keys(customersData).forEach(city => {
      if (cityLocations[city]) {
        customersData[city] = {
          totalSales: customersData[city],
          ...cityLocations[city]
        };
      }
    });
    console.log('Sales data with coordinates:', customersData);
    // Here you can write this data to a JSON file or directly serve it via an API
  });

  