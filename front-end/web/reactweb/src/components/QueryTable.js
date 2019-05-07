import React from 'react';

import { Query } from "react-apollo";
import { all_movie } from "../queries";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Table from "../Home";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
    },
});

class QueryTable extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={12} md={9}>
                <Table>
                    <TableBody>
                        <Query id="test" query={all_movie}>{({ loading, data, error }) => {
                            if(loading) return <tr><td>Loading</td></tr>;
                            if(error) return <tr><td>{error}</td></tr>;
                            return data.movies.map((movie, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <img src={movie.poster_url + "?type=m99_141_2"} alt={"poster_img"} />
                                        <h4>{movie.kor_title}</h4>
                                    </TableCell>
                                </TableRow>
                            ));
                        }
                        }
                        </Query>
                    </TableBody>
                </Table>
            </Grid>
        );
    }
}

QueryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryTable);