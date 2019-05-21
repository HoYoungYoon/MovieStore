import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Layout from '../constants/Layout'
import TINT_COLOR from '../constants/Color'
import MovieRating from './MovieRating'


const Container = styled.View`
flex: 1;
position: relative;
`;

const BgImage = styled.View`
width: 100%;
height: ${Layout.height / 3};
opacity: 0.9;
position: absolute;
backgroundColor: black
`;

const Content = styled.View`
flex : 1;
flex-direction: row;
padding-horizontal: 30px;
justify-content: space-between;
align-items: center;
`;


const Overview = styled.Text`
  color: ${TINT_COLOR};
  font-size: 12px;
  margin-bottom: 10px;
`;


const VoteContainer = styled.View`
  margin: 10px 0px;
`;


const BtnContainer = styled.TouchableOpacity`
  background-color: #e74c3c;
  border-radius: 5px;
  padding: 8px;
`;


const BtnText = styled.Text`
  color: white;
  font-size: 12px;
`;

const Poster = styled.Image`
width: 110px;
height: 160px;
border-radius: 2.5px;
`;

const Column = styled.View`
width: 60%;
align-items : flex-start;
`;

const Title = styled.Text`
fontSize : 13;
fontWeight : bold;
color : white;
`;



const MovieSlide = ({
    id,
    posterPhoto,
    backgroundPhoto,
    kor_title,
    voteAvg,
    movie_plot 
}) => 
    <Container>
        <BgImage/>
        <Content>
            <Poster source = {{uri : posterPhoto}}/>
            <Column>
                <Title>{kor_title}</Title>
                {voteAvg ? (
          <VoteContainer>
            <MovieRating votes={voteAvg} inSlide={true} />
          </VoteContainer>
        ) : null}
        {/* {overview ? (
          <Overview>
            {overview.length > 117
              ? `${overview.substring(0, 120)}...`
              : overview}
          </Overview>
        ) : null} */}
        <BtnContainer
          onPress={() =>
            navigation.navigate({
              routeName: "Detail",
              params: {
                isMovie: true,
                id,
                posterPhoto,
                backgroundPhoto,
                title,
                voteAvg,
              }
            })
          }
        >
          <BtnText>View details</BtnText>
        </BtnContainer>
      
        </Column>
        </Content>
        
        
    </Container>;

        
MovieSlide.propTypes = {
    
    id: PropTypes.number.isRequired,
    posterPhoto : PropTypes.string.isRequired,
    backgroundPhoto : PropTypes.string.isRequired,
    kor_title: PropTypes.string.isRequired,
    voteAvg: PropTypes.number.isRequired,
    movie_plot: PropTypes.string.isRequired
}

export default MovieSlide;