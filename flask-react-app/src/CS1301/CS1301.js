import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import history from './../history';

class CS1301 extends Component {

    routeChange=()=> {
        let path = "MidtermExamDate";
        history.push(path);
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>CS 1301 Discussion Threads</h2>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup>
                            <ListGroup.Item action href="https://www.wikipedia.org/">Homework 1</ListGroup.Item>
                            <ListGroup.Item action onClick={this.routeChange}>Midterm Exam Date?</ListGroup.Item>
                            <ListGroup.Item>How to Mutate Tuples</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CS1301;