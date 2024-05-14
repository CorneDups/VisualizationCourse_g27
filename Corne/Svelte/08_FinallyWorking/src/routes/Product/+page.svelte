<script>
  import { onMount } from 'svelte';

  let finalData = [];

  onMount(async () => {
    const [purchasesData, plantsData, customersData] = await Promise.all([
      fetchData('data/Purchases.csv'),
      fetchData('data/Plants.csv'),
      fetchData('data/extractedCityLocations.csv')
    ]);

    const parseCSV = (text) => {
      const [header, ...rows] = text.split('\n').filter(line => line.trim());
      const headers = header.split(',').map(h => h.trim());
      return rows.map(row => {
        const values = row.split(',').map(value => value.trim());
        return headers.reduce((acc, header, index) => {
          acc[header] = values[index];
          return acc;
        }, {});
      }).filter(obj => Object.keys(obj).length === headers.length);
    };

    const purchases = parseCSV(purchasesData);
    const plants = parseCSV(plantsData);
    const customers = parseCSV(customersData);

    console.log('Parsed Purchases:', purchases);
    console.log('Parsed Plants:', plants);
    console.log('Parsed Customers:', customers);

    const purchaseTotals = purchases.reduce((acc, { PlantKey, PurchaseOrderQuantity }) => {
      const quantity = parseInt(PurchaseOrderQuantity, 10);
      if (isNaN(quantity)) {
        console.error('Invalid PurchaseOrderQuantity:', PurchaseOrderQuantity);
        return acc;
      }
      acc[PlantKey] = (acc[PlantKey] || 0) + quantity;
      return acc;
    }, {});

    console.log('PurchaseTotals Data:', purchaseTotals);

    const purchaseWithCities = Object.entries(purchaseTotals).map(([key, totalQuantity]) => {
      const plant = plants.find(p => p.PlantKey === key);
      if (!plant) console.log(`No plant found for key: ${key}`);
      return { PlantCity: plant ? plant.PlantCity : null, TotalQuantity: totalQuantity };
    }).filter(p => p.PlantCity);

    console.log('Purchase Cities Data:', purchaseWithCities);

    finalData = purchaseWithCities.map(({ PlantCity, TotalQuantity }) => {
      const location = customers.find(c => c.CustomerCity.toLowerCase() === PlantCity.toLowerCase());
      if (!location) console.log(`No location found for city: ${PlantCity}`);
      return {
        PlantCity,
        TotalQuantity,
        Latitude: location ? location.Latitude : null,
        Longitude: location ? location.Longitude : null
      };
    });

    console.log('Aggregated Data:', finalData);
  });

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  }
</script>
