import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types'
import Loader from '../../components/Loader';


const TvPresenter = ({loading, topRated, popular, airingToday}) =>
 loading ?  (<Loader/>) :  <Text>TV</Text>


 TvPresenter.propTypes = {
     loading: PropTypes.bool.isRequired,
     topRated: PropTypes.array,
     popular: PropTypes.array,
     airingToday: PropTypes.array,
 }
 
 export default TvPresenter;

