const { Pool } = require('pg')

module.exports = new Pool({
    user: "template",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})