// src/routes/employees/+page.server.js
// import db from '$lib/db';

// export async function load() {
//     const employees = await db.select('*').from('employees').limit(2);
//     return {
//         props: { employees }
//     };
// }

import db from '$lib/db';

export async function load() {
    const customers = await db.select('CustomerKey', 'CustomerName', 'CustomerCountry').from('customers').limit(5);
    return {
        props: { customers }
    };
}