// src/routes/api/sundata.js
import sqlite3 from 'sqlite3';

export async function get(request) {
    const db = new sqlite3.Database('./static/allSunChargeData.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
            return { status: 500, body: { error: 'Failed to connect to the database' }};
        }
        console.log('Connected to the SUN CHARGE database.');
    });

    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM sales", [], (err, rows) => {
            db.close();
            if (err) {
                reject({ status: 500, body: { error: err.message }});
            } else {
                resolve({ status: 200, body: { data: rows }});
            }
        });
    });
}

