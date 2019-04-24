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

// async 라우팅 핸들러를 사용할 수 있는 두 가지 방법 중 1 (데코레이터 패턴)
// https://programmingsummaries.tistory.com/399
const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

const find = (movie) => {
    return new Promise((resolve, reject) => {
        model.Movie.find({
            'kor_title': movie.kor_title,
            'naver_link': movie.naver_link,
        }, (err, rst) => {
            if(err)
                reject(err);
            else{
                resolve(rst.length);
            }
        });
    });
};

const detail = (naver_link) => {
    return new Promise((resolve, reject) => {
        request(naver_link, async function(error, response, body) {
            let $ = cheerio.load(body);
            let rst = [];

            if(error)
                reject(error);
            else{
                rst.eng_title = $('.mv_info_area > .mv_info > .h_movie2').text().replace(/\s/gi, "");
                rst.naver_audience_rating = $('.mv_info_area > .mv_info > .main_score').find('.ntz_score > .star_score > em').text();
                rst.naver_journalist_rating = $('.mv_info_area > .mv_info > .main_score').find('.spc > .star_score > em').text();
                rst.movie_plot = $('.story_area > .con_tx').text();
                rst.total_audience = $('.step9_cont > .count').text();
                resolve(rst);
            }
        });
    });
};

const save = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.eval("getNextSequence('movie')", (err, rst) => {
            if(err)
                reject(err);
            else
                resolve(rst);
        });
    });
};

const update = (movie) => {
    return new Promise((resolve, reject) => {
        model.Movie.updateOne(
        { 'kor_title': movie.kor_title, 'naver_link': movie.naver_link },
        { $set: {
                'naver_audience_rating': movie.naver_audience_rating,
                'naver_journalist_rating': movie.naver_journalist_rating,
                'booking_rate': movie.booking_rate,
                'total_audience': movie.total_audience,
                'update_time': moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }, function (err, result) {
            if (err)
                reject(err);
            else{
                resolve('success');
            }
        });
    });
};

const crawling = async () => {
    return new Promise((resolve, reject) => {
        let url = 'https://movie.naver.com/movie/running/current.nhn';
        let save_cnt = 0;
        let update_cnt = 0;

        request(url, async function(error, response, body){
            let $ = cheerio.load(body);
            let nml = $(".lst_detail_t1 li");

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
                if( (tmp[1] != undefined) && (tmp[1].indexOf("분") !== -1))
                    show_time = tmp[1].replace("분", "");

                let opening_date = "";
                if((tmp[2] != undefined) && (tmp[2].indexOf("개봉") !== -1))
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

                // detail 정보 가져오기
                await detail(naver_link)
                    .then((result) => {
                        movie.eng_title = result.eng_title;
                        movie.naver_audience_rating = result.naver_audience_rating;
                        movie.naver_journalist_rating = result.naver_journalist_rating;
                        movie.movie_plot = result.movie_plot;
                        movie.total_audience = result.total_audience;
                    })
                    .catch(err => console.error(err));

                let find_cnt = '';
                await find(movie)
                    .then( result => find_cnt = result)
                    .catch(err => reject(err));

                if(find_cnt == 0){
                    await save()
                        .then((result) => {
                            movie.idx = result;
                            movie.save()
                                .then( save_cnt++ )
                                .catch(err => reject(err));
                        })
                        .catch(err => console.error(err));
                }else{
                    await update(movie)
                        .then((result) => {
                            if(result === 'success')
                                update_cnt++;
                        })
                        .catch(err => reject(err));
                }

                if(i == nml.length - 1){
                    resolve({
                        'save_cnt' : save_cnt,
                        'update_cnt' : update_cnt
                    });
                }

            }

        });

    });

};

router.get('/', doAsync(async function(req, res) {

    await crawling()
        .then((result) => {
            res.json(result);
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
        })
        .catch(err => console.error(err));

}));

module.exports = router;