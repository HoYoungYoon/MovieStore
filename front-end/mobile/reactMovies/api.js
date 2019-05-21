import axios from 'axios'
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

// Apollo client
export const graphClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
    cache: new InMemoryCache().restore({}),
});

export const MOVIE_QUERY = gql`
query{
    movies{
    idx
    kor_title
    eng_title
    genre
    show_time
    opening_date
    movie_director
    movie_stars
    movie_rating
    movie_plot
    naver_audience_rating
    naver_journalist_rating
    poster_url
    preview:
    naver_link
    booking_rate
    total_audience
    cgv_rating
    daum_rating
    write_time
    update_time
    opening_pre
    }
  }
  `;

   
  

// Axios API 연습 

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params:{
        'api_key' : 'd1b891db56a09895f5ce89642d40316d',
        'language' : 'ko',       
    }
});


// https://developers.themoviedb.org/3/search/search-movies 참고 
// Movie API 
export const moviesApi= {
    getNowPlaying : () => api.get('movie/now_playing'),
    getUpcoming : () => api.get('movie/upcoming'),
    getTopRated : () => api.get('movie/top_rated'),
    getPopular : () => api.get('movie/popular'),
    getMovieDetail : (id) => api.get(`movie/${id}`,{
        params : {
            append_to_response: 'videos'
        }
    }),
    getSearchMovie : (term) => api.get('search/movie', {
        params : {
            query : encodeURIComponent(term)
        }
    })
}

// TV API
export const tvApi = {
    getTopRated : () => api.get('tv/top_rated'),
    getPopular : () => api.get('tv/popular'),
    getAiringToday : () => api.get('tv/airing_today'),
    getTvDetail : (id) => api.get(`tv/${id}`,{
        params : {
            append_to_response: 'videos'
        }
    }),
    getSearchTV : (term) => api.get('search/tv', {
        params : {
            query : encodeURIComponent(term)
        }
    })
}

