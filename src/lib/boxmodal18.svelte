<script>
    const frequenciesyard = {
        '0': 1324,
        '1': 16,
        '2': 17,
        '3': 17,
        '4': 12,
        '5': 13,
        '6': 17,
        '7': 14,
        '8': 9,
        '9': 18,
        '10': 14,
        '11': 18,
        '12': 17,
        '13': 12,
        '14': 19,
    };

    const frequenciesship = {
        '0': 1334,
        '1': 16,
        '2': 17,
        '3': 16,
        '4': 12,
        '5': 11,
        '6': 17,
        '7': 14,
        '8': 9,
        '9': 16,
        '10': 14,
        '11': 16,
        '12': 17,
        '13': 12,
        '14': 16,
    };
    
    let tooltipText = '';
    
    const maxFrequency = Math.max(
        ...Object.values(frequenciesyard),
        ...Object.values(frequenciesship)
    );
    const width = 600;
    const height = 300;
    const padding = 60;

    function getXPosition(index) {
        return padding + (index + 1) * (width - 2 * padding) / (Object.keys(frequenciesyard).length + 1);
    }

    function getYPosition(frequency) {
        return height - padding - (frequency / maxFrequency) * (height - 2 * padding);
    }

    function getRadius(frequency) {
        return Math.sqrt(frequency) * 0.55;
    }

    const yardXPositions = Object.keys(frequenciesyard).map((day, index) => getXPosition(index));
    const shipXPositions = Object.keys(frequenciesship).map((day, index) => getXPosition(index));

    const minYardX = Math.min(...yardXPositions);
    const maxYardX = Math.max(...yardXPositions);
    const minShipX = Math.min(...shipXPositions);
    const maxShipX = Math.max(...shipXPositions);
    
    function handleCircleMouseOver(event, frequency) {
        tooltipText = `Frequency: ${frequency}`;
    }

    function handleCircleMouseOut() {
        tooltipText = '';
    }
</script>

<svg width={width} height={height}>
    <text x={width / 2} y={190} font-size="16" text-anchor="middle" fill="black">Difference between the Planned and Actual Arrival Date to Yard</text>
    <text x={width / 2} y={70} font-size="16" text-anchor="middle" fill="rgb(126, 192, 200)">Difference between the Planned and Actual Shipping Date</text>

    {#each Object.keys(frequenciesyard) as day, index}
        <!-- Frequencies Yard Circles and Line -->
        {#if index === 0}
            <line x1={minYardX} x2={maxYardX} y1={220} y2={220} stroke="black" stroke-width="1" />
        {/if}
        <circle
            cx={getXPosition(index)}
            cy={220}
            r={getRadius(frequenciesyard[day])}
            fill="black"
            on:mouseover={(event) => handleCircleMouseOver(event, frequenciesyard[day])}
            on:mouseout={handleCircleMouseOut}
            on:focus={(event) => handleCircleMouseOver(event, frequenciesyard[day])}
            on:blur={handleCircleMouseOut}
            tabindex="0"
        />
        <text x={getXPosition(index)} y={260} font-size="12" text-anchor="middle" fill="black">{index}</text>
        
        <!-- Frequencies Ship Circles and Line -->
        {#if index === 0}
            <line x1={minShipX} x2={maxShipX} y1={100} y2={100} stroke="rgb(126, 192, 200)" stroke-width="1" />
        {/if}
        <circle
            cx={getXPosition(index)}
            cy={100}
            r={getRadius(frequenciesship[day])}
            fill="rgb(126, 192, 200)"
            on:mouseover={(event) => handleCircleMouseOver(event, frequenciesship[day])}
            on:mouseout={handleCircleMouseOut}
            on:focus={(event) => handleCircleMouseOver(event, frequenciesship[day])}
            on:blur={handleCircleMouseOut}
            tabindex="0"
        />
        <text x={getXPosition(index)} y={140} font-size="12" text-anchor="middle" fill="rgb(126, 192, 200)">{index}</text>
    {/each}

    <!-- Tooltip -->
    <g transform="translate(20, 20)">
        {#if tooltipText}
            <rect x="0" y="0" width="120" height="40" fill="white" stroke="black" />
            <text x="10" y="20" font-size="12">{tooltipText}</text>
        {/if}
    </g>
</svg>

<div>
    <p>
        Here, you can see how many days later the orders were shipped and arrived to the 
        shipment yard than planned. The size of the circle corresponds to frequency. If 
        you hover over the circles, the frequency in numbers will be shown. 
    </p>
</div>

<style>
    svg {
        border: 2px solid #ddd;
    }

    div {
        margin-top: 2px;
        text-align: center;
    }

    p {
        font-size: 16px;
        width: 80%;
        margin-left: 1.5cm;
        justify-content: center;
    }
</style>