import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import makePhotoUrl from '../utils/makePhotoUrl';


const Container = styled.View``;

const BgImage = styled.Image``;



const MovieSlide = ({
    id,
    posterPhoto,
    backgroundPhoto,
    title,
    voteAvg,
    overView
}) => 
    // console.log("imgPath", id,posterPhoto,title,voteAvg,overView, backgroundPhoto);
    <Container>
        <BgImage source ={{uri : makePhotoUrl(backgroundPhoto)}}></BgImage>
    </Container>;

        
MovieSlide.propTypes = {
    
    id: PropTypes.number.isRequired,
    posterPhoto : PropTypes.string.isRequired,
    backgroundPhoto : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteAvg: PropTypes.number.isRequired,
    overView: PropTypes.string.isRequired
}

export default MovieSlide;