<script>
    export let data;
    let countries = [];
  
    // Extract countries as soon as data is available
    $: if (data && data.props.customersData) {
      countries = Array.from(new Set(data.props.customersData.map(customer => customer.CustomerCountry)));
    }
  
    let selectedCountry = countries[0] || ''; // Default to the first country if available
  
    // Filter customers based on the selected country
    $: customers = data.props.customersData.filter(customer => customer.CustomerCountry === selectedCountry);
  </script>
  
  <select bind:value={selectedCountry}>
    {#each countries as country}
      <option value={country}>{country}</option>
    {/each}
  </select>
  
  <h2>You have selected: {selectedCountry}</h2>
  
  <main>
    <section>
      <h1>Customers</h1>
      <table>
        {#if customers && customers.length > 0}
          <tr>
            {#each Object.keys(customers[0]) as key}
              <th>{key}</th>
            {/each}
          </tr>
          {#each customers as customer}
            <tr>
              {#each Object.keys(customer) as key}
                <td>{customer[key]}</td>
              {/each}
            </tr>
          {/each}
        {:else}
          <p>No customer data available.</p>
        {/if}
      </table>
    </section>
  </main>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px 15px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
      color: #333;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    tr:hover {
      background-color: #f1f1f1;
    }
  </style>