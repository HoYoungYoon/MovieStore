const express = require('express');
const router = express.Router();

// moment
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

// 크롤링
const request = require('request');
const cheerio = require('cheerio');

const mongoose = require('mongoose');
const model = require('../models/model');

router.get('/', function(req, res) {
    let url = 'https://movie.naver.com/movie/running/premovie.nhn';

    request(url, async function(error, response, body){
        let  result_arr = [];
        let $ = cheerio.load(body);
        let nml = $(".lst_detail_t1 li");

        let save_cnt = 0;
        let update_cnt = 0;

        for(let i = 0; i < nml.length; i++) {
            /*
                리스트에서 구할 수 있는 정보들 1차 추출 (이미지, 제목, 관객 제한, 예매율, 상세링크, 장르, 상영시간, 개봉일, 감독, 배우)
             */
            let kor_title = $(nml[i]).find('.lst_dsc > .tit > a').text();
            let movie_rating = $(nml[i]).find('.lst_dsc > .tit > span').text();
            let poster_url = $(nml[i]).find('.thumb > a > img').attr('src').split("?type")[0];
            let naver_link = 'https://movie.naver.com' + $(nml[i]).find('.lst_dsc > .tit > a').attr('href');
            let booking_rate = $(nml[i]).find('.lst_dsc > .star > .info_exp > dd > div > .num').text();
            
            let tmp = $(nml[i]).find('.lst_dsc > dd').eq(1).find('.info_txt1 dd').eq(0).text().replace(/\s/gi, "").replace(",", ", ").split("|");
        
            let genre = tmp[0];
            let show_time = "";
            if( (tmp[1] !== undefined) && (tmp[1].search("분") == true))
                show_time = tmp[1].replace("분", "");
               
            let opening_date = "";
            if((tmp[2] !== undefined) && (tmp[2].search("개봉") == true))
                opening_date = tmp[2].replace("개봉", "");    
            
            let movie_director = $(nml[i]).find('.lst_dsc > dd').eq(1).find('.info_txt1 dd').eq(1).find('.link_txt > a').text();
            let movie_stars = $(nml[i]).find('.lst_dsc > dd').eq(1).find('.info_txt1 dd').eq(2).text().replace(/\s/gi, "").replace(",", ", ");

            let movie = new model.Movie();
            movie.kor_title     = kor_title;
            movie.movie_rating  = movie_rating;
            movie.poster_url    = poster_url;
            movie.naver_link    = naver_link;
            movie.booking_rate  = booking_rate;
            movie.genre         = genre;
            movie.show_time     = show_time;
            movie.opening_date  = opening_date;
            movie.movie_director= movie_director;
            movie.movie_stars   = movie_stars;
            movie.write_time    = moment().format('YYYY-MM-DD HH:mm:ss');
            movie.update_time   = moment().format('YYYY-MM-DD HH:mm:ss');
            movie.opening_pre   = false;

            let find_cnt = 0;
            await model.Movie.find({
                'kor_title': kor_title,
                'naver_link': naver_link,
            }, (err, rst) => {
                if(err)
                    console.error(err);
                else
                    find_cnt = rst.length;
            });

            // save
            if(find_cnt == 0){
                let promise = new Promise((resolve, reject) => {
                    mongoose.connection.db.eval("getNextSequence('movie')", (err, rst) => {
                        if(err)
                            reject(err);
                        else
                            resolve(rst);
                    });
                });

                await promise
                    .then((rst) => {
                        movie.idx = rst;
                    })
                    .catch((err) =>{
                        console.error(err);
                    });

                movie.save(function(err) {
                    if(err){
                        console.error(err);
                        res.json({ error : err });
                        return;
                    }
                    save_cnt++;
                });
            }
            // modify
            else{
                model.Movie.updateOne({
                    'kor_title': movie.kor_title,
                    'naver_link': movie.naver_link
                }, {
                    'update_time': movie.update_time
                }, function(err, output){
                    if(err){
                        console.error(err);
                        res.json({ error: err });
                        return;
                    }
                    update_cnt++;
                });
            }

        }

        res.json({
           'save_cnt': save_cnt,
           'update_cnt': update_cnt
        });

    });

});

module.exports = router;