import gql from 'graphql-tag';

export const HOME_PAGE = gql`
    query{
        movies{
            idx
            kor_title
        }
    }
`;