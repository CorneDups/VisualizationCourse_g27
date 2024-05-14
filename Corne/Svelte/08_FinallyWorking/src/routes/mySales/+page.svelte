<h1>Relative Sales for each Country</h1>

<script>
    import { onMount } from 'svelte';
    import { csv } from 'd3-fetch';

    import Icon from "$images/map.jpg"

    let countrySalesWithLocation = [];
    let opacity = 1;  // Default opacity
    let imageWidth = 2000;  // Default width of the image
    let imageHeight = 1000;  // Default height of the image

    
    async function loadData() {
        const salesData = await csv('data/Sales.csv');
        const customersData = await csv('data/Customers.csv');
        const cityLocationsData = await csv('data/extractedCityLocations.csv');

        // Prepare sales data by customer key
        const totalSalesByCustomer = salesData.reduce((acc, sale) => {
            let key = sale.CustomerKey;
            let quantity = parseFloat(sale.OrderQuantity);
            acc[key] = (acc[key] || 0) + quantity;
            return acc;
        }, {});

        // Aggregate sales by country
        let countryInfo = customersData.reduce((acc, customer) => {
            let key = customer.CustomerKey;
            let country = customer.CustomerCountry;
            if (!acc[country]) acc[country] = { sales: 0, locations: [] };
            if (totalSalesByCustomer[key]) {
                acc[country].sales += totalSalesByCustomer[key];
            }
            return acc;
        }, {});

        // Combine country sales data with location from city locations
        countrySalesWithLocation = Object.entries(countryInfo).map(([country, info]) => {
            let location = cityLocationsData.find(loc => loc.CustomerCountry === country);
            let latitude = location ? parseFloat(location.Latitude) : 0;
            let longitude = location ? parseFloat(location.Longitude) : 0;
            return { country, sales: info.sales, latitude, longitude };
        });

        console.log('Country Sales with Location:', countrySalesWithLocation);
    }

    onMount(() => {
        loadData();
    });

    // Dimensions of the SVG
    const width = 10000;
    const height = 2000;

    // Helper functions for scaling and coloring
    function scaleLongitude(longitude) {
        return ((longitude + 5) % 360) * (width / 360);
    }

    function scaleLatitude(latitude) {
        const scaledLatitude = 80 - latitude;
        return scaledLatitude * (height / 180);
    }

    function scaleSalesToRadius(sales) {
        const maxRadius = 50;
        const scaledRadius = Math.sqrt(sales) * 0.08;
        return Math.min(scaledRadius, maxRadius);
    }

    function getColorBySales(sales) {
        if (sales > 100000) return '#003366';
        if (sales > 50000) return '#0066CC';
        if (sales > 10000) return '#6699FF';
        return '#CCDDFF';
    }

</script>

<main>
    <img src={Icon} alt="download icon"/>
</main>

<!-- <style>
    svg {
        width: 100%;
        height: 500px;
        border: 1px solid #ccc;
    }
</style> -->

<svg width={width} height={height}>
    

    {#each countrySalesWithLocation as { country, sales, latitude, longitude }}
        <circle cx={scaleLongitude(longitude)} cy={scaleLatitude(latitude)}
                r={scaleSalesToRadius(sales)} fill={getColorBySales(sales)}
                stroke="black" stroke-width="1">
            <title>{country}: {sales}</title>
        </circle>
    {/each}
</svg>

<style>
    svg {
        width: 100%;  
        height: auto;  
        border: 1px solid #ccc;
        /* viewBox: "0 0 10000 2000"; */
    }
</style>