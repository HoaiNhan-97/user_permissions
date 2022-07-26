const client = require("../../../config/connect_redis");

const set = async (key, value, options) => {
  try {
    await client.connect();
    await client.set(key, value, options);
    await client.quit();
  } catch (err) {
    await client.quit();
    throw new Error("Redis " + err.message);
  }
};

const get = async (key) => {
  try {
    await client.connect();
    const value  = await client.get(key);
    await client.quit();
    return value
  } catch (err) {
    await client.quit();
    throw new Error("Redis " + err.message);
  }
};

module.exports = {set,get};
