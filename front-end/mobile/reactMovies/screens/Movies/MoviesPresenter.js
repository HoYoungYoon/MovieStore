import React from 'react';
import { Text, FlatList } from 'react-native';
import Loader from '../../components/Loader';
import styled from "styled-components"
import MovieSlider from '../../components/MovieSlider'
import { graphql } from 'react-apollo';
import  { MOVIE_QUERY } from '../../api'


const Container = styled.ScrollView``;
const MoviesPresenter = graphql(MOVIE_QUERY)(({data}) =>{
    const {loading, movies } = data;

    if(loading)
        return <Loader/>;
    else   
     return (
        <Container style={{ padding: 10 }}>
        {movies ? 
            <MovieSlider movies= {movies}/>
             : <Text>Error(작업 처리예정)</Text>
        }
      </Container>
     );         
});
export default MoviesPresenter;