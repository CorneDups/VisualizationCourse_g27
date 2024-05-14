<h1>Relative Sales for each city</h1>
<script>
    import { onMount } from 'svelte';
    import { csv } from 'd3-fetch';
    import mapIcon from '../../images/map.png';
    
    let opacity = 1;  // Default opacity
    let imageWidth = 100;  // Default width of the image
    let imageHeight = 200;  // Default height of the image

        // Mapping of countries to colors
        const countryColors = {
        "Germany": "#FFD700", "Belgium": "#FF6347", "Estonia": "#4682B4", 
        "France": "#DA70D6", "Sweden": "#F08080", "Poland": "#8FBC8F",
        "Norway": "#6495ED", "Czech Republic": "#DDA0DD", "Greece": "#BC8F8F",
        "Netherlands": "#FFA07A", "Croatia": "#B0E0E6", "Lithuania": "#FFDEAD",
        "Finland": "#00CED1", "Italy": "#FFB6C1", "Slovenia": "#87CEEB",
        "Hungary": "#32CD32", "United Kingdom": "#BA55D3", "Denmark": "#FF4500",
        "Spain": "#6A5ACD", "Portugal": "#48D1CC", "Latvia": "#C71585",
        "Switzerland": "#DB7093"
    };


    // Global variables for data
    let selectedAggregation = 'city';  // default to city
    let citySalesWithLocation = [];
    let cityInfo = {};
    let salesData = [];
    let customersData = [];

    async function loadData() {
        salesData = await csv('data/Sales.csv');
        customersData = await csv('data/Customers.csv');
        const cityLocationsData = await csv('data/extractedCityLocations.csv');


        // Extract unique countries
        let countries = new Set(customersData.map(customer => customer.CustomerCountry));
        console.log("Unique Countries:", Array.from(countries));

        // Prepare sales data by customer key
        const totalSalesByCustomer = salesData.reduce((acc, sale) => {
            let key = sale.CustomerKey;
            let quantity = parseFloat(sale.OrderQuantity);
            acc[key] = (acc[key] || 0) + quantity;
            return acc;
        }, {});

        // Prepare city information with sales data
        cityInfo = customersData.reduce((acc, customer) => {
            let key = customer.CustomerKey;
            let city = customer.CustomerCity;
            let country = customer.CustomerCountry; // Assuming country is in Customers.csv
            if (!acc[city]) acc[city] = { sales: 0, country: country, customers: [] };
            if (totalSalesByCustomer[key]) {
                acc[city].sales += totalSalesByCustomer[key];
            }
            if (!acc[city].customers.includes(key)) {
                acc[city].customers.push(key);
            }
            return acc;
        }, {});

        // Combine city sales data with location
        const cityLocations = cityLocationsData.map(location => {
            let city = location.CustomerCity;
            return {
                city: city,
                sales: cityInfo[city] ? cityInfo[city].sales : 0,
                latitude: parseFloat(location.Latitude),
                longitude: parseFloat(location.Longitude),
                country: cityInfo[city] ? cityInfo[city].country : 'Unknown'
            };
        });

        citySalesWithLocation = [...cityLocations];

        aggregateData();  // Call aggregation after loading data
    }

    function aggregateData() {
        switch (selectedAggregation) {
            case 'city':
                // Direct city aggregation, already present in citySalesWithLocation
                break;
            case 'country':
                const countrySales = {};
                for (const { city, country, sales } of citySalesWithLocation) {
                    if (country in countrySales) {
                        countrySales[country].sales += sales;
                    } else {
                        countrySales[country] = {
                            sales,
                            latitude: parseFloat(cityInfo[city]?.latitude ?? 0),  // You may want a better way to handle coordinates
                            longitude: parseFloat(cityInfo[city]?.longitude ?? 0)
                        };
                    }
                }
                citySalesWithLocation = Object.keys(countrySales).map(country => ({
                    city: country,
                    sales: countrySales[country].sales,
                    latitude: countrySales[country].latitude,
                    longitude: countrySales[country].longitude
                }));
                break;
            case 'customer':
                // Aggregate sales by individual customer
                citySalesWithLocation = customersData.map(customer => {
                    const customerSales = salesData
                        .filter(sale => sale.CustomerKey === customer.CustomerKey)
                        .reduce((acc, sale) => acc + parseFloat(sale.OrderQuantity), 0);
                    return {
                        city: customer.CustomerKey,  // use CustomerKey as the identifier
                        sales: customerSales,
                        latitude: 0,  // Placeholder if no specific coordinates are available
                        longitude: 0
                    };
                });
                break;
        }

        // Ensure full reassignment to trigger updates
        citySalesWithLocation = [...citySalesWithLocation];
    }

    // Call loadData once on mount
    onMount(() => {
        loadData();
    });

    // Dimensions of the SVG
    const width = 10000;
    const height = 2800;

    // Helper functions for scaling and coloring
    function scaleLongitude(longitude) {
        return ((longitude + 5) % 360) * (width / 360);
    }

    function scaleLatitude(latitude) {
        const scaledLatitude = 68 - latitude;
        return scaledLatitude * (height / 180);
    }

    function scaleSalesToRadius(sales) {
        const maxRadius = 50;
        const scaledRadius = Math.sqrt(sales) * 0.08;
        return Math.min(scaledRadius, maxRadius);
    }

    function getColorByCountry(country) {
        return countryColors[country] || '#CCCCCC'; // Default color if not defined
    }

    // Ensure that aggregateData gets called whenever the selection changes
    $: aggregateData();
</script>

<select bind:value={selectedAggregation}>
    <option value="city">City</option>
    <option value="country">Country</option>
    <option value="customer">Customer</option>
</select>

<main style="position: relative; width: 100%; height: 100%;">
    <img class="map-icon" src={mapIcon} alt="Full map" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
    <!-- Other content can go here -->
</main>

<style>
    svg {
        width: 100%;
        height: 500px;
        border: 1px solid #ccc;
    }
    /* .map-icon {
        height: 100px;
        width: 100px;
    } */
</style>

<svg width={width} height={height}>

  {#each citySalesWithLocation as { city, sales, latitude, longitude, country }}
      <circle cx={scaleLongitude(longitude)} cy={scaleLatitude(latitude)}
              r={scaleSalesToRadius(sales)} fill={getColorByCountry(country)}
              stroke="black" stroke-width="1">
          <title>{city}, {country}: {sales}</title>
      </circle>
  {/each}

    <!-- Updated Legend in Two Columns -->
    <g transform="translate(20, 20)">
      {#each Object.entries(countryColors) as [country, color], i}
          <g transform={`translate(${Math.floor(i / 11) * 150}, ${(i % 11) * 20})`}>
              <!-- Adjust the x translate value to create two columns -->
              <rect width="15" height="15" fill={color}></rect>
              <text x="20" y="12" font-size="12">{country}</text>
          </g>
      {/each}
  </g>
</svg>

