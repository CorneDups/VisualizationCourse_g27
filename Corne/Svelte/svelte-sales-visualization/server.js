const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());  // Enable CORS

// Connect to SQLite database
const db = new sqlite3.Database('./static/allSunChargeData.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.get('/sales-data', (req, res) => {
    const sql = `SELECT SalesOrderCreationDate, SUM(OrderQuantity) as TotalQuantity
                 FROM sales
                 GROUP BY SalesOrderCreationDate
                 ORDER BY SalesOrderCreationDate`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
