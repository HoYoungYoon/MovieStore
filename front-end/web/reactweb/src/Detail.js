import React from 'react';
import { Query } from "react-apollo";
import { Detail_PAGE } from "./queries";

const Detail = () => (
    <Query query={Detail_PAGE}>{({ loading, data, error }) => {
        if(loading) return <span>Loading</span>
        if(error) return <span>{console.log(error)}</span>
        return data.movies.map(movie => (
            <tr>
                <td key={movie.idx}>
                    {movie.kor_title}
                </td>
            </tr>
        ));
    }
    }
    </Query>
);

export default Detail