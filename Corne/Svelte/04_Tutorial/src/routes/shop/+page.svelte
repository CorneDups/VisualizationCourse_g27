<script>
    export let data
    const {products} = data
    console.log(data)
</script>

<h1>Shop</h1>
{#each products as product}
    <h2>{product.title}</h2>
    <p>{product.price} $</p>
{/each}