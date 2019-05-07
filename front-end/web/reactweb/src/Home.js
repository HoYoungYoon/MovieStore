import React from 'react';
import { Query } from "react-apollo";
import { all_movie } from "./queries";
import { one_movie } from "./queries";

import Header from './components/Header';
import NavTabs from './components/NavTabs';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    },
    mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
    },
    mainGrid: {
        marginTop: theme.spacing.unit * 3,
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

class Home extends React.Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            hidden: false,
            query_string: 'all_movie',
            query : all_movie
        };
        this.change_movie_state = this.change_movie_state.bind(this);
    };

    // Sidebar.js 값 받아서 state 변경
    change_movie_state(param) {
        this.setState({query_string: param});
        if(param === "all_movie")
            this.setState({query : all_movie});
        else
            this.setState({query : one_movie});
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={this.props.classes.layout}>
                    <Header/>
                    <NavTabs/>

                    <main>
                        <Grid container spacing={40} className={this.props.classes.mainGrid}>
                            <Sidebar change_movie_state={this.change_movie_state} />
                            {/* Main content */}
                            <Grid item xs={12} md={9}>
                                <Table>
                                    <TableBody>
                                        <Query query={this.state.query}>{({loading, data, error}) => {
                                            if (loading) return <tr>
                                                <td>Loading</td>
                                            </tr>;
                                            if (error) return <tr>
                                                <td>{console.log(error)}</td>
                                            </tr>;

                                            if(this.state.query_string === "all_movie"){
                                                return data.movies.map((movie, index) => (
                                                    <TableRow key={index} hover>
                                                        <TableCell>
                                                            <Grid container>
                                                                <Grid item>
                                                                    <img src={movie.poster_url + "?type=m99_141_2"}
                                                                         alt={"poster_img"}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <h4>{movie.kor_title}</h4>
                                                                    <img src={""}/>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                ));
                                            }
                                            else if(this.state.query_string === "one_movie"){
                                                return <TableRow key={1} hover>
                                                    <TableCell>
                                                        <img src={data.movie.poster_url + "?type=m99_141_2"}
                                                             alt={"poster_img"}/>
                                                        <h4>{data.movie.kor_title}</h4>
                                                    </TableCell>
                                                </TableRow>;
                                            }

                                        }
                                        }
                                        </Query>
                                    </TableBody>
                                </Table>
                            </Grid>
                            {/* End main content */}
                        </Grid>
                    </main>
                </div>

                <Footer/>

            </React.Fragment>
        );

    }

}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);