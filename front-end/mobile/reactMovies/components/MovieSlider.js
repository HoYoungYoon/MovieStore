import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Swiper from 'react-native-swiper'
import Layout from '../constants/Layout'
import MovieSlide from './MovieSlide'

const SWIPER_HEIGHT = Layout.height / 3;

const View = styled.View`
    height: ${SWIPER_HEIGHT};
`;

const Text = styled.Text``;


const MovieSlider = ({ movies }) => (
    movies ? <Swiper
        showsPagination={false}
        autoplay={true}
        style={{ height: SWIPER_HEIGHT }} >

        {
            movies.filter(movie =>
                 movie.backdrop_path != null).map(movie =>
                <View key={movie.id}>
                    <MovieSlide 
                    id = {movie.id}
                    posterPhoto = {movie.poster_path} 
                    backgroundPhoto = {movie.backdrop_path}
                    title = {movie.title}
                    voteAvg = {movie.vote_average}
                    overView ={movie.overview}                                                        
                    />
                </View>)}

    </Swiper> : null );

MovieSlider.propTypes = {
    movies: PropTypes.array
}

export default MovieSlider;