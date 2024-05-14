<script>
    import { onMount } from 'svelte';
    import { Map, TileLayer, CircleMarker } from 'svelte-leaflet';
    import { loadData } from './loadData.js';
    import { aggregateSales } from './aggregateSales.js';
    import { mapCityCoordinates } from './mapCityCoordinates.js';
    
    let cityData = [];
    
    onMount(async () => {
        const salesData = await loadData('/data/Sales.csv');
        const customersData = await loadData('/data/Customers.csv');
        const cityLocations = await loadData('/data/extractedCityLocations.csv');
        
        const salesPerCity = aggregateSales(salesData, customersData);
        cityData = mapCityCoordinates(salesPerCity, cityLocations);
    });
    </script>
    
    <Map center={[51.1657, 10.4515]} zoom={6}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {#each cityData as city}
            <CircleMarker
                center={[city.latitude, city.longitude]}
                radius={Math.sqrt(city.sales) * 5}
                fillColor="red"
                fillOpacity={0.5}
                stroke={false}>
                <Tooltip>{city.city}: {city.sales} sales</Tooltip>
            </CircleMarker>
        {/each}
    </Map>
    