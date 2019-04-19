import React from 'react';
import SearchPreseneter from './SearchPresenter'

export default class SearchContainer extends React.Component {
    
    state = {
        loading : true
    };

    render() 
    {
        const {loading} = this.state
        return <SearchPreseneter loading= {loading}/>;
    }


}
