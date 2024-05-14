<script>
    import { onMount } from 'svelte';
    import Papa from 'papaparse';
  
    let salesData = [];
  
    async function loadSalesData() {
      // const response = await fetch('https://raw.githubusercontent.com/JannesPeeters/suncharge/main/data/Sales.csv', {
      //   headers: {
      //     'Content-Type': 'text/csv'
      //   }
      // });

      const response = await fetch('/api/JannesPeeters/suncharge/main/data/Sales.csv', {
        headers: {
          'Content-Type': 'text/csv'
        }
      });
      const csv = await response.text();
      const parsedCsv = Papa.parse(csv, { header: true, skipEmptyLines: true });
      salesData = parsedCsv.data.slice(0, 10);
    }
  
    onMount(() => {
      loadSalesData();
    });
  </script>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
  </style>
  
  {#if salesData.length > 0}
    <table>
      <thead>
        <tr>
          <th>CustomerKey</th>
          <th>OrderQuantity</th>
          <th>DeliveryDate</th>
        </tr>
      </thead>
      <tbody>
        {#each salesData as item}
          <tr>
            <td>{item.CustomerKey}</td>
            <td>{item.OrderQuantity}</td>
            <td>{item.DeliveryDate}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading data...</p>
  {/if}
  