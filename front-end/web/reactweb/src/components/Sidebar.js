import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// const axios = require('axios');

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

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            radio_value : 'movie',
        };
    }

    // 사이드바 라디오 버튼으로 상태 변경 & Home.js 전달
    handleChange = event => {
        if(event.target.value === "movie"){
            this.props.change_movie_state("all_movie");
            this.setState({radio_value: "movie"});
        }
        else{
            this.props.change_movie_state("one_movie");
            this.setState({radio_value: "premovie"});
        }
    };

    render() {
        return (
            <Grid item xs={12} md={3}>
                <Paper className={this.props.classes.paper} elevation={2}>
                    <Typography variant="h6" className={this.props.classes.sidebarSection}>
                        분류
                    </Typography>
                    <FormControl component="fieldset" className={this.props.classes.formControl}>
                        <RadioGroup
                            name="movie_state"
                            value={this.state.radio_value}
                            className={this.props.classes.group}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value={'movie'} control={<Radio color="primary" />} label={'현재 상영작'} />
                            <FormControlLabel value={'premovie'} control={<Radio color="primary" />} label={'개봉 예정작'} />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);