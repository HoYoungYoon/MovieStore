import React from 'react';
import MoviesPresenter from './MoviesPresenter';
import { moviesApi } from '../../api';


export default class MoviesContainer extends React.Component{

    state = {
        loading : true,
        upcomming : null,
        popular : null,
        nowPlaying : null,
        error : null
    };


    async componentDidMount() {
        let upcomming, popular, nowPlaying, error;
        try {
            ({
                data : { results : upcomming }
            } = await moviesApi.getUpcoming());
            ({
                data : { results : popular }
            } = await moviesApi.getPopular());
            ({ 
                data : { results : nowPlaying}
            } = await moviesApi.getNowPlaying());
        } catch (error) {
            console.log(error);
            error = '영화 정보 불러오기 실패';
        }finally{
            this.setState({ 
                loading : false, 
                error, upcomming, 
                popular, 
                nowPlaying });
        }
    }


    render()
    {
        console.log(this.state);
        const { loading, upcomming, popular, nowPlaying } = this.state;
        return <MoviesPresenter loading ={loading} upcomming = {upcomming} popular = {popular} nowPlaying = {nowPlaying} />;
    }

}