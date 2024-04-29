var my_plot = document.getElementById('my_plot')
for ( var i = 0; i < 10; i++ ) {
    let newElement = document.createElementNS('http://www.w3.org/2000/svg','circle')
    newElement.setAttribute('cx', Math.floor(Math.random()*300));
    newElement.setAttribute('cy', Math.floor(Math.random()*300));
    newElement.setAttribute('r','20');
    my_plot.appendChild(newElement);
}