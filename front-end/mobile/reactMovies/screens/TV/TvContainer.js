import React from 'react'
import TvPresenter from './TvPreseneter'
import { tvApi } from '../../api';

export default class TvContainer extends React.Component {

    state = {
        loading : true,
        error : null,
        topRated : null,
        popular : null,
        airingToday : null
    };

    async componentDidMount()
    {
        let  topRated, popular, airingToday, error;
        try {
            ({
                data : { results : topRated }
            } = await tvApi.getTopRated());
            ({
                data : { results : popular }
            } = await tvApi.getPopular());
            ({ 
                data : { results : airingToday }
            } = await tvApi.getAiringToday());
            
        } catch (error) {
            console.log(error);
            error = "TV 데이터 불러오기 오류"
        }
        finally{
            this.setState({
                loading : false,
                error, 
                topRated, 
                popular, 
                airingToday});        
        }
    }

    render()
    {
        const {loading, topRated, popular, airingToday} = this.state; 
        return <TvPresenter loading = {loading} topRated = {topRated} popular = {popular} airingToday = {airingToday}/>;
    }
}