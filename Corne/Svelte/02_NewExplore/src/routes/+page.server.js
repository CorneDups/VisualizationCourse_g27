import db from '$lib/db';

export const load = () => {
    const fetchData = async () => {
        let sales = await db.select('*')
                                .from('sales')
                                .limit(2)
        return sales
    }

    return {
        sales: fetchData()
    }
}