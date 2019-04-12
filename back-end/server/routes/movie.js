const express = require('express');
const router = express.Router();

const request = require('request');
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
    let url = 'https://www.rottentomatoes.com';

    request(url, function(error, response, body){
        let  result_arr = [];
        const $ = cheerio.load(body);
        let col_arr = $("#Top-Box-Office").children('tbody').children('tr');

        for(let i = 0; i < col_arr.length; i++){
            // result_arr.push(col_arr[i].children[0]);
            console.log( $(col_arr[i]).children('.left_col').children('a').children('.tMeterScore').text() );
        }

        res.send(result_arr);
        // res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify(result_arr));
    });

});

module.exports = router;