<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
  
	let ctx;
	let chart;
	let salesData = [];
  
	onMount(async () => {
	  const response = await fetch('http://localhost:3000/sales-data');
	  const data = await response.json();
	  salesData = data.data;
	  createChart();
	});
  
	function createChart() {
	  chart = new Chart(ctx, {
		type: 'line',
		data: {
		  labels: salesData.map(d => d.SalesOrderCreationDate),
		  datasets: [{
			label: 'Order Quantity',
			data: salesData.map(d => d.TotalQuantity),
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1
		  }]
		},
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  }
		}
	  });
	}
  </script>
  
  <svelte:head>
	<style>
	  canvas {
		max-width: 600px;
	  }
	</style>
  </svelte:head>
  
  <canvas bind:this={ctx}></canvas>
  