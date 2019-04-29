import React from 'react';
import { SafeAreaView } from 'react-native'
import MoviesPresenter from './MoviesPresenter';
import { moviesApi, graphClient } from '../../api';
import { ApolloProvider } from 'react-apollo';


export default class MoviesContainer extends React.Component{

    // state = {
    //     loading : true,
    //     upcomming : null,
    //     popular : null,
    //     nowPlaying : null,
    //     error : null
    // };


    // async componentDidMount() {
    //     let upcomming, popular, nowPlaying, error;
    //     try {
    //         ({
    //             data : { results : upcomming }
    //         } = await moviesApi.getUpcoming());
    //         ({
    //             data : { results : popular }
    //         } = await moviesApi.getPopular());
    //         ({ 
    //             data : { results : nowPlaying}
    //         } = await moviesApi.getNowPlaying());
    //     } catch (error) {
    //         console.log(error);
    //         error = '영화 정보 불러오기 실패';
    //     }finally{
    //         this.setState({ 
    //             loading : false, 
    //             error, upcomming, 
    //             popular, 
    //             nowPlaying });
    //     }
    // }


    render() {
        return(
          <ApolloProvider client={graphClient}>
              <MoviesPresenter />
          </ApolloProvider>
        );
      }
    
}