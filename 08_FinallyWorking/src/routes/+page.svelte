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




<script>
	
  const frequenciesyard = {
      '0': 1324,
      '1': 16,
      '2': 17,
      '3': 17,
      '4': 12,
      '5': 13,
      '6': 17,
      '7': 14,
      '8': 9,
      '9': 18,
      '10': 14,
      '11': 18,
      '12': 17,
      '13': 12,
      '14': 19,
  };

  const frequenciesship = {
      '0': 1334,
      '1': 16,
      '2': 17,
      '3': 16,
      '4': 12,
      '5': 11,
      '6': 17,
      '7': 14,
      '8': 9,
      '9': 16,
      '10': 14,
      '11': 16,
      '12': 17,
      '13': 12,
      '14': 16,
  };

  const maxFrequency = Math.max(
      ...Object.values(frequenciesyard),
      ...Object.values(frequenciesship)
  );
  const width = 600;
  const height = 300;
  const padding = 60;

  function getXPosition(index) {
      return padding + (index + 1) * (width - 2 * padding) / (Object.keys(frequenciesyard).length + 1);
  }

  function getYPosition(frequency) {
      return height - padding - (frequency / maxFrequency) * (height - 2 * padding);
  }

  function getRadius(frequency) {
      return Math.sqrt(frequency) * 0.55;
  }

  const yardXPositions = Object.keys(frequenciesyard).map((day, index) => getXPosition(index));
  const shipXPositions = Object.keys(frequenciesship).map((day, index) => getXPosition(index));

  const minYardX = Math.min(...yardXPositions);
  const maxYardX = Math.max(...yardXPositions);
  const minShipX = Math.min(...shipXPositions);
  const maxShipX = Math.max(...shipXPositions);
</script>

<svg width={width} height={height}>
  <text x={width / 2} y={190} font-size="16" text-anchor="middle" fill="black">Difference between the Planned and Actual Arrival Date to Yard</text>
  <text x={width / 2} y={70} font-size="16" text-anchor="middle" fill="rgb(126, 192, 200)">Difference between the Planned and Actual Shipping Date</text>

  {#each Object.keys(frequenciesyard) as day, index}
      <!-- Frequencies Yard Circles and Line -->
      {#if index === 0}
          <line x1={minYardX} x2={maxYardX} y1={220} y2={220} stroke="black" stroke-width="1" />
      {/if}
      <circle
          cx={getXPosition(index)}
          cy={220}
          r={getRadius(frequenciesyard[day])}
          fill="black"
          title={frequenciesyard[day]}
      />
      <text x={getXPosition(index)} y={260} font-size="12" text-anchor="middle" fill="black">{index}</text>
      
      <!-- Frequencies Ship Circles and Line -->
      {#if index === 0}
          <line x1={minShipX} x2={maxShipX} y1={100} y2={100} stroke="rgb(126, 192, 200)" stroke-width="1" />
      {/if}
      <circle
          cx={getXPosition(index)}
          cy={100}
          r={getRadius(frequenciesship[day])}
          fill="rgb(126, 192, 200)"
          title={frequenciesship[day]}
      />
      <text x={getXPosition(index)} y={140} font-size="12" text-anchor="middle" fill="rgb(126, 192, 200)">{index}</text>
  {/each}
</svg>

<div>
  <p>
      Here, you can see how many days later the orders were shipped and arrived to the 
      shipment yard than planned. The size of the circle corresponds to frequency. If 
      you hover over the circles, the frequency in numbers will be shown. 
  </p>
</div>

<style>
  svg {
      border: 1px solid #ddd;
  }

  div {
      margin-top: 20px;
      text-align: center;
  }

  p {
      font-size: 16px;
      width: 80%;
      margin: auto;
  }
</style>
