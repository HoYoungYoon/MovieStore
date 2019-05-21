import React from 'react';
import { SafeAreaView } from 'react-native'
import MoviesPresenter from './MoviesPresenter';
import { moviesApi, graphClient } from '../../api';
import { ApolloProvider } from 'react-apollo';


export default class MoviesContainer extends React.Component{

    render() {
        return(
          <ApolloProvider client={graphClient}>
              <MoviesPresenter />
          </ApolloProvider>
        );
      }
    
}