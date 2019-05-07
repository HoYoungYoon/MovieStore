import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route } from 'react-router-dom';
import client from './apolloClient';
import Home from "./Home";

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <React.Fragment>
                        <Route exact={true} path={"/"} component={Home} />
                    </React.Fragment>
                </Router>
                {/*<div className="App" />*/}
            </ApolloProvider>
        );
    }
}

export default App;