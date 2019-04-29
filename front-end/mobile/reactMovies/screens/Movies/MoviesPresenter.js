import React from 'react';
import { Text, FlatList } from 'react-native';
import Loader from '../../components/Loader';
import styled from "styled-components"
import { graphql } from 'react-apollo';
import  { MOVIE_QUERY } from '../../api'

const Container = styled.ScrollView``;

const MoviesPresenter = graphql(MOVIE_QUERY)(({data}) =>{
    const {loading, movies } = data;
    console.log(movies);
    if(loading)
        return <Loader/>;
    else   
     return (
        <Container style={{ padding: 10 }}>
        {movies.map(({kor_title, genre, show_time, poster_url, movie_plot, movie_rating }) => (
            <FlatList
            data={[{key: kor_title, key: genre,key: show_time,key: poster_url,key: movie_plot,key: movie_rating}]}
            renderItem={({movies}) => <Text>{show_time}</Text>}
            />
          
        //   <Text key={kor_title}>
        //     {kor_title}
        //     {'\n'}
        //   </Text>
        ))}
      </Container>
     );         
});
export default MoviesPresenter;