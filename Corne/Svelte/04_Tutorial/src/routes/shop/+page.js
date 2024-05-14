export const load = async ({fetch}) =>{
    const productRes = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
    const productData = await productRes.json()
    const products = productData.products

    const usersRes = await fetch('https://dummyjson.com/users?limit=10')
    const usersData = await usersRes.json()
    const users = usersData.users

    return {
        products: products,
        users: users
    }
}