export const load = async ({ fetch }) => { (1)
    const responseFlowers = await fetch('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json') (2)
    const dataFlowers = await responseFlowers.json() (3)
  
    return {
      flowers: dataFlowers (4)
    }
  }