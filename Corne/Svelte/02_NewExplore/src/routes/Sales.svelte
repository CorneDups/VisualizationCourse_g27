<script>
    import { onMount } from 'svelte';
  
    let data = [];
    let loading = true;
    let error = null;
  
    onMount(async () => {
      try {
        const response = await fetch('/api/sundata');
        if (response.ok) {
          const result = await response.json();
          data = result.data;
          loading = false;
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (e) {
        error = e.message;
        loading = false;
      }
    });
  </script>
  
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p style="color: red;">Error: {error}</p>
  {:else}
    <ul>
      {#each data as item}
        <li>{item.column_name}</li> <!-- Replace 'column_name' with the actual column name from your sales table -->
      {/each}
    </ul>
  {/if}
  