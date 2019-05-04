import React from 'react';

import { Query } from "react-apollo";
import { all_movie } from "./queries";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';

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
    toolbarMain: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
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
    markdown: {
        padding: `${theme.spacing.unit * 3}px 0`,
    },
    sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing.unit * 3,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
    },
});


const sections = [
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Politics',
    'Opinion',
    'Science',
    'Health',
    'Style',
    'Travel',
];

function Home(props) {
    const { classes } = props;
    return  (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.layout}>
                <Toolbar className={classes.toolbarMain}>
                    <Button size="small">Subscribe</Button>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        Blog
                    </Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="outlined" size="small">
                        Sign up
                    </Button>
                </Toolbar>
                <Toolbar variant="dense" className={classes.toolbarSecondary}>
                    {sections.map(section => (
                        <Typography color="inherit" noWrap key={section}>
                            {section}
                        </Typography>
                    ))}
                </Toolbar>

                <table>
                    <tbody>
                    <Query query={all_movie}>{({ loading, data, error }) => {
                        if(loading) return <tr><td>Loading</td></tr>;
                        if(error) return <tr><td>{error}</td></tr>;
                        return data.movies.map((movie, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={movie.poster_url + "?type=m99_141_2"} alt={"poster_img"} />
                                    {movie.kor_title}
                                </td>
                            </tr>
                        ));
                    }
                    }
                    </Query>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);