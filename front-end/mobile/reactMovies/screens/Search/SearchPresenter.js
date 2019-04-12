import React from 'react';
import { Text } from 'react-native';
import Loader from '../../components/Loader';
import PropTypes from 'prop-types'


const SearchPresenter = ({loading}) =>
    loading ? <Loader /> : <Text>Search</Text>

SearchPresenter.propTypes = {
    loading: PropTypes.bool.isRequired
}


export default SearchPresenter;