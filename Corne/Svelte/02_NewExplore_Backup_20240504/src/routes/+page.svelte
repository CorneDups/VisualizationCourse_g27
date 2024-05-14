<script>
  export let data = [];
</script>

<h1>Employees</h1>

<ul>
{#each data.sales as sales}
  <li>{sales.SalesOrder} {sales.DeliveryDate}</li>
{/each}
</ul>