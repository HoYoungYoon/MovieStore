module.exports = function(mongoose){
    return new mongoose.Schema({
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
        preview: [],
        naver_link: String,
        booking_rate: Number,
        total_audience: String,

        cgv_rating: Number,
        daum_rating: Number,

        write_time: Date,
        update_time: Date,
        opening_pre: Boolean
    });
};