import knex from 'knex'

  export default knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: "./static/allSunChargeData.db"
    }
});