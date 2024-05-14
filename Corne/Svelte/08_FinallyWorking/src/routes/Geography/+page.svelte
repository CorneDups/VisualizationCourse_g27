<!-- Go check this out: https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/grids -->


<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let customerData;

  let svg;

  onMount(async () => {
    const worldData = await d3.json('path/to/your/geojson.json');
    const projection = d3.geoMercator().scale(100).translate([200, 150]);
    const pathGenerator = d3.geoPath().projection(projection);

    d3.select(svg)
      .selectAll('path')
      .data(worldData.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('fill', (d) => {
        const country = customerData.find(c => c.countryCode === d.id);
        return country ? d3.interpolateBlues(country.customerCount / 1000) : '#ccc';
      });
  });
</script>

<svg bind:this={svg} width="400" height="300"></svg>
