<script>
    import Modal from '/Users/keziahdutt/my-app/src/components/modal.svelte';
    import '/Users/keziahdutt/my-app/src/routes/global.css';
    import BoxModal18 from '/Users/keziahdutt/my-app/src/lib/boxmodal18.svelte';
    import Boxmodal19 from '../components/boxmodal19.svelte';
    import Boxmodal20 from '../components/boxmodal20.svelte';
    import Boxmodal21 from '$lib/boxmodal21.svelte';
    import Boxmodal22 from '$lib/boxmodal22.svelte';
    import Boxmodal23 from '$lib/boxmodal23.svelte';
    import Boxmodal24 from '$lib/boxmodal24.svelte';
    import Boxmodal25 from '/Users/keziahdutt/my-app/src/lib/boxmodal25.svelte';
    import Boxmodal26 from '$lib/boxmodal26.svelte';
    import Boxmodal27 from '$lib/boxmodal27.svelte';
    import Boxmodal28 from '$lib/boxmodal28.svelte';
    import Boxmodal29 from '$lib/boxmodal29.svelte';
    import Boxmodal30 from '$lib/boxmodal30.svelte';
    import Boxmodal31 from '$lib/boxmodal31.svelte';
    import Boxmodal32 from '$lib/boxmodal32.svelte';
    import Boxmodal33 from '$lib/boxmodal33.svelte';
    import Boxmodal34 from '$lib/boxmodal34.svelte';
    import Boxmodal35 from '$lib/boxmodal35.svelte';
    import Boxmodal36 from '$lib/boxmodal36.svelte';
    import Boxmodal37 from '$lib/boxmodal37.svelte';
    import Boxmodal38 from '$lib/boxmodal38.svelte';

    const manualPercentages = {
        '18': 0.38970588,
        '19': 0.44447262,
        '20': 0.70867140,
        '21': 0.73123732,
        '22': 0.76166329,
        '23': 1.00000000,
        '24': 0.22312373,
        '25': 0.06465517,
        '26': 0.06795132,
        '27': 0.05451318,
        '28': 0.06211968,
        '29': 0.06566937,
        '30': 0.05958418,
        '31': 0.06516227,
        '32': 0.06338742,
        '33': 0.05299189,
        '34': 0.05882353,
        '35': 0.06541582,
        '36': 0.05831643,
        '37': 0.06110548,
        '38': 0.01242394
    };

    let showOverlayModal = false;
    let showBoxModal = false;
    let selectedBox = null;

    function openOverlayModal(box) {
        showOverlayModal = true;
        selectedBox = box;
    }

    function openBoxModal(box) {
        showBoxModal = true;
        selectedBox = box;
    }

    function calculatePercentage(percentage) {
        return ((percentage * 3944) / 20000) * 100;
    }
</script>

<div class="container">
    <div class="headerbox"> 
        <h1>Total Production Time in Days</h1>
    </div>
    {#each Object.entries(manualPercentages) as [id, percentage]}
        <div class="box" on:click={() => openBoxModal({ id, percentage })}>
            <div class="overlay" style="height: {percentage * 100}%" on:click|stopPropagation={() => openOverlayModal({ id, percentage })}></div>
            <div>{id} days</div>
        </div>
    {/each}
</div>

<div class="annotation">Click on each box and blue area to find out more information</div>

{#if showOverlayModal}
    <Modal bind:showModal={showOverlayModal}>
        <h3 slot="header">{(calculatePercentage(selectedBox.percentage)).toFixed(2)}% of all orders were completed in {selectedBox.id} days</h3>
        <p>
            This blue section of this box represents the frequency 
            of all completed orders which were executed in {selectedBox.id} days 
            from the order date to the delivery date. This is shown in 
            comparison to the maximum frequency which was observed at 23 days 
            in order to increase readability.
        </p>
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '18'}
    <Modal bind:showModal={showBoxModal}>
        <BoxModal18 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '19'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal19 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '20'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal20 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '21'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal21 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '22'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal22 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '23'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal23 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '24'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal24 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '25'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal25 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '26'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal26 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '27'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal27 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '28'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal28 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '29'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal29 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '30'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal30 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '31'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal31 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '32'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal32 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '33'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal33 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '34'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal34 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '35'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal35 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '36'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal36 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '37'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal37 />
    </Modal>
{/if}

{#if showBoxModal && selectedBox.id === '38'}
    <Modal bind:showModal={showBoxModal}>
        <Boxmodal38 />
    </Modal>
{/if}
<style>
    .headerbox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        background-color: whitesmoke;
        height: 100px;
        width: 1412px;
        border: 1px solid black;
        margin-left: 47.5px;
        z-index: 999;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 200px;
        margin-bottom: 400px;
        background-color: whitesmoke;
        z-index: 1;
    }

    .box {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border: 1px solid black;
        z-index: 1;
        cursor: pointer;
    }

    .overlay {
        width: 100%;
        background-color: rgb(126, 192, 200);
        cursor: pointer;
    }
    .annotation {
        position: fixed;
        right: 10px;
        bottom: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
    }
</style>