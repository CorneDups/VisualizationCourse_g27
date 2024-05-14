<script>
  import { Map, TileLayer, CircleMarker } from 'svelte-leaflet';
  import { onMount } from 'svelte';

  let salesData = [];

  onMount(async () => {
    const response = await fetch('/path/to/your/sales/data.json');
    salesData = await response.json();
  });
</script>

<Map {zoom} {center}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {#each Object.entries(salesData) as [city, data]}
    <CircleMarker
      lat={data.latitude}
      lng={data.longitude}
      radius={Math.sqrt(data.totalSales) * scaleFactor}
    />
  {/each}
</Map>
