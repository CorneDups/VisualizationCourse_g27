import Papa from 'papaparse';

// Function to fetch and parse CSV data
async function fetchAndParseCSV(fetch, url) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'text/csv' }
  });
  const text = await response.text();
  return Papa.parse(text, { skipEmptyLines: true, header: true }).data;
}

// Load function to get data for SvelteKit
export async function load({ fetch }) {
  const customersData = await fetchAndParseCSV(fetch, 'http://localhost:5173/data/Customers.csv');
  const plantsData = await fetchAndParseCSV(fetch, 'http://localhost:5173/data/plants.csv');

  return {
    props: {
      customersData,
      plantsData
    }
  };
}
