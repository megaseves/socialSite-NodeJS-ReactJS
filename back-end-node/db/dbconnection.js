const pg = require("pg");

const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "megaS022",
    database: "socialSite"
})
client.connect();
module.exports = client;