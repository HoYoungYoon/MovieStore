import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Swiper from 'react-native-swiper'
import Layout from '../constants/Layout'
import MovieSlide from './MovieSlide'
import Loader from './Loader'

const SWIPER_HEIGHT = Layout.height / 3;

const View = styled.View`
    height: ${SWIPER_HEIGHT};
`;

const Text = styled.Text``;


const MovieSlider = ({ movies }) => 
    (    
    movies ? <Swiper
        showsPagination={false}
        autoplay={false}        
        style={{ height: SWIPER_HEIGHT }} >                    
        {                                
            movies.map(({idx, kor_title, poster_url, naver_audience_rating, movie_plot }) => (            
                <View key={idx}>
                    <MovieSlide                     
                    id = {idx}  
                    posterPhoto = {poster_url} 
                    backgroundPhoto = {poster_url}
                    kor_title = {kor_title}
                    voteAvg = {naver_audience_rating}
                    movie_plot ={movie_plot}                                                        
                    />                
                </View>

            ))}

    </Swiper> : <Loader/> );

MovieSlider.propTypes = {
    movies: PropTypes.array
}

export default MovieSlider;