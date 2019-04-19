const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    idx: Number,
    kor_title: String,
    eng_title: String,
    genre: String,
    show_time: Number,
    opening_date: Date,
    movie_director: String,
    movie_stars: String,
    movie_rating: String,
    movie_plot: String,
    naver_audience_rating: Number,
    naver_journalist_rating: Number,
    poster_url: String,
    preview_url: String,
    naver_link: String,
    booking_rate: Number,

    cgv_rating: Number,
    daum_rating: Number,

    write_time: Date,
    update_time: Date
});

mongoose.model('Movie', movieSchema);
module.exports = mongoose.model('Movie');