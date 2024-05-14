<!-- <script context="module">
    export { load } from './+page.server.js';
</script>

<script>
    export let props;
</script>

<h1>Employees</h1>
<ul>
{#each props.employees as employee}
    <li>{employee.firstname} {employee.name}</li>
{/each}
</ul> -->

<script context="module">
    export { load } from './+page.server.js';
</script>

<script>
    export let props;
</script>

<h1>Customers</h1>
<ul>
{#each props.customers as customer}
    <li>{customer.CustomerName} - {customer.CustomerCountry}</li>
{/each}
</ul>