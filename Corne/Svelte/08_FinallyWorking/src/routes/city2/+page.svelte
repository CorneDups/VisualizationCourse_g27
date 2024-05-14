<h1>Sales Visualization by Country</h1>
<script>
    import { onMount } from 'svelte';
    import { csv } from 'd3-fetch';

    // Path to your CSV file
    let dataPath = 'data/Combined_SalesCoordinates.csv';
    let plantsDataPath = 'data/PlantsEnhanced.csv';  // Assuming CSV conversion

    let salesData = [];
    let plantsData = [];

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

    async function loadData() {
        salesData = await csv(dataPath);
        plantsData = (await csv(plantsDataPath)).filter(d => d.PlantKey >= 4 && d.PlantKey <= 8);
        salesData.forEach(d => {
            d.Longitude = parseFloat(d.Longitude);
            d.Latitude = parseFloat(d.Latitude);
            console.log("Sales coordinates: " + d.Latitude + ", " + d.Longitude); // Check coordinates
        });
        plantsData.forEach(d => {
            d.Longitude = parseFloat(d.Longitude);
            d.Latitude = parseFloat(d.Latitude);
            console.log("Plant coordinates: " + d.Latitude + ", " + d.Longitude); // Check coordinates
        });
        // console.log("Data Loaded plants:", plantsData);
        // console.log("Data Loaded sales:", salesData);
    }

    // Dimensions of the SVG
    const width = 1500;
    const height = 1500;

    // Helper functions for scaling and coloring
    function scaleLongitude(longitude) {
        let longtVal = ((longitude+1) % 60) * (width / 60);
        // console.log("longtitudeVal: ", longtVal);
        return longtVal;
    }

    function scaleLatitude(latitude) {
        const scaledLatitude = 65 - latitude;
        let latVal = scaledLatitude * (height / 90);
        // console.log("lattitudeVal: ", latVal);
        return latVal;
    }

    function scaleSalesToRadius(sales) {
        const maxRadius = 50;
        const scaledRadius = Math.sqrt(sales) * 0.04; // Adjust scale factor as needed
        return Math.min(scaledRadius, maxRadius);
    }

    function scaleOrdersToSize(orders) {
        //const maxSize = 5000000;
        const maxSize = 5000;
        let varValue = 0;
        // console.log("Orders are: ", orders);
        varValue = Math.min(Math.sqrt(orders) * 0.04, maxSize);
        // console.log("Becomes: ", varValue);
        return varValue;  // Ensure minimum size for visibility
    }

    function getColorByCountry(country) {
        return countryColors[country] || '#CCCCCC'; // Default color if not defined
    }

    // Call loadData once on mount
    onMount(() => {
        loadData();
    });
</script>

<style>
    svg {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }
</style>

<svg width={width} height={height}>
    {#each salesData as { CustomerCountry, TotalSales, Latitude, Longitude }}
        <circle cx={scaleLongitude(Longitude)} cy={scaleLatitude(Latitude)}
                r={scaleSalesToRadius(TotalSales)} fill={countryColors[CustomerCountry] || '#CCCCCC'} stroke="black" stroke-width="1">
            <title>Total Sales - {CustomerCountry}: {TotalSales}</title>
        </circle>
    {/each}
    {#each plantsData as { PlantName, TotalOrderQuantityForDistributionCentre, Latitude, Longitude }}
        
        <rect x={scaleLongitude(Longitude)}
              y={scaleLatitude(Latitude)}
              width={scaleOrdersToSize(TotalOrderQuantityForDistributionCentre)}
              height={scaleOrdersToSize(TotalOrderQuantityForDistributionCentre)}
              fill="darkgreen" opacity="0.5" stroke="black" stroke-width="1">
              
            <title>Total Orders - {PlantName}: {TotalOrderQuantityForDistributionCentre}</title>
        </rect>
    {/each}
</svg>
