import React from 'react';
import { Query } from "react-apollo";
import { HOME_PAGE } from "./queries";

const Home = () => (
    <Query query={HOME_PAGE}>{({ loading, data, error }) => {
            if(loading) return <span>Loading</span>
            if(error) return <span>{console.log(error)}</span>
            return data.movies.map(movie => (
                <h2 key={movie.idx}>
                    {movie.kor_title}
                </h2>
            ));
        }
    }
    </Query>
);

export default Home