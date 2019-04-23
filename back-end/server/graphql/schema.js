const dao = require('../daos/dao');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        movies : [Movie]
    }

    type Movie {
        idx: Int,
        kor_title: String,
        eng_title: String,
        genre: String,
        show_time: Int,
        opening_date: String,
        movie_director: String,
        movie_stars: String,
        movie_rating: String,
        movie_plot: String,
        naver_audience_rating: Float,
        naver_journalist_rating: Float,
        poster_url: String,
        preview_url: String,
        naver_link: String,
        booking_rate: Float,

        cgv_rating: Float,
        daum_rating: Float,

        write_time: String,
        update_time: String,
        opening_pre: Boolean
    }
`);

var resolver = {
    movies: async (args, context, info) => {
        return await dao.movie.getAllMovies();
    },
};

module.exports = {schema: schema, root: resolver};