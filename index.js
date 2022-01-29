    require('dotenv').config()
const express = require ('express');
const request = require ('request-promise');


const app = express();
const PORT = process.env.PORT || 5000;
const returnScraperApiUrl = process.env.API_KEY;

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.com/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

 app.listen(PORT, function(req,res){
     console.log("Server is running on 5000");
 })