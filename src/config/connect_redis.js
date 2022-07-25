require("dotenv").config();
const {createClient} = require("redis");

const client = createClient({
    url: process.env.URI_REDIS
})
client.on('error', (err) => console.log('Redis Client Error', err));

module.exports = client;
