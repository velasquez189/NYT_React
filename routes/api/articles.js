const router = require('express').Router();
const axios = require('axios');
require('dotenv').load();

router.route('/')
    .get( (req, res) => {
        console.log(req.query);
        let url;
        const apiKey = process.env.NYT_API_KEY;
        req.query.startDate ?
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${req.query.query}&begin_date=${req.query.startDate}`
            : url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${req.query.query}

        axios({
            method: 'get',
            url: url,
        }).then(response => {
            const article = response.data.response;
            console.log(response.data.response);
            res.json(article);
        }).catch(err => {
            console.log(err);
        })
    });

module.exports = router;