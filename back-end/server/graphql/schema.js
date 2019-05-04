const dao = require('../daos/dao');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        movies : [Movie],
        movie(kor_title: String!): Movie
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
        preview: [preview],
        naver_link: String,
        booking_rate: Float,
        total_audience: String,

        cgv_rating: Float,
        daum_rating: Float,

        write_time: String,
        update_time: String,
        opening_pre: Boolean
    }
    
    type preview {
        preview_title: String,
        preview_url: String
    }
`);

var resolver = {
    movies: async (args, context, info) => {
        return await dao.movie.getAllMovies();
    },
    movie: async (args, context, info) => {
        const {kor_title} = args;
        return await dao.movie.getMovie(kor_title);
    }
};

module.exports = {schema: schema, root: resolver};