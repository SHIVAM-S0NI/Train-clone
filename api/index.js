const PORT = process.env.PORT || 3000;
require("dotenv").config();
const axios = require('axios');
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/search/:key", async (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://trains.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'trains.p.rapidapi.com'
        },
        data: { search: req.params.key }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: "Something went wrong.",
            error,
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} 🚀.`)
})
