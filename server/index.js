const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env` });

console.log(process.env.EXCHANGE_RATE_API_KEY);
console.log(process.env.EXCHANGE_RATE_API_URL);

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/convert", async (req, res) => {
    const { from, to } = req.query;
    const APIURL = `${process.env.EXCHANGE_RATE_API_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`;
    const response = await fetch(APIURL);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    res.send({ rate, time_last_update_unix: data.time_last_update_unix });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});