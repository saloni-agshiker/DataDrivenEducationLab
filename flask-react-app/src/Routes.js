import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import About from "./About/About";
import Contact from "./Contact/Contact";
import CS1301 from "./CS1301/CS1301";
import CS1301Comments from "./CS1301Comments/CS1301Comments";
import Product from "./Product/Product";
import Home from "./Home/Home";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/CS1301" component={CS1301} />
                    <Route path="/About" component={About} />
                    <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Product} />
                    <Route path="/MidtermExamDate" component={CS1301Comments} />
                </Switch>
            </Router>
        )
    }
}