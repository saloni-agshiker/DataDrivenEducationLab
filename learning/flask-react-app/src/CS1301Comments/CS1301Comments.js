import React, { Component } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

class CS1301Comments extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>Homework 1</h2>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup>
                            <ListGroup.Item>When is homework 1 due?</ListGroup.Item>
                            <ListGroup.Item>Has anyone figured out how to do #1?</ListGroup.Item>
                            <ListGroup.Item>Lecture slides from week 2 were really helpful.</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CS1301Comments;