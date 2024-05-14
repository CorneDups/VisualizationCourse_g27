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
  const Purchases2Data = await fetchAndParseCSV(fetch, 'http://localhost:5173/data/Purchases2.csv');
  console.log('Purchases2Data:', Purchases2Data); // Log the fetched data
  return {
    props: {
      Purchases2Data
    }
  };
}
