import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>About This Application</h2>
                    <p style={{textAlign: "left", paddingLeft: 30, paddingRight: 30}}>
                        Forums can be wonderful places where students from around the globe discuss deep
                        problems and learn from one another. They can also be pits of toxicity and despair,
                        ghost-towns, or even worse, boring. A good forum or discussion tool is crucial to the
                        success of learning at scale. Without it students are isolated, and cannot form
                        communities to tackle tough problems and they won't learn from one another.
                    </p>
                    <p style={{textAlign: "left", paddingLeft: 30, paddingRight: 30}}>
                        The discussion forum subteam of the data driven VIP team has created this application
                        in order to provide metrics and data analysis on the activity in the edX discussion
                        forums. There is a range of information that can be derived from the forums such as
                        polarity and sentiment analysis, participation metrics, and cognitive presence.
                    </p>
                </div>
                <div>
                    <h2>How To Use This Application</h2>  
                    <p style={{textAlign: "left", paddingLeft: 30, paddingRight: 30}}>
                        Your courses can be seen in the navigation bar at the top of the page. By clicking on
                        one of the courses, you will be redirected to a page that lists the threads of discussion.
                        Click on one of the list items and you will be redirected to a page that lists the comments
                        in that thread as well as metrics and data visualizations for that thread.
                    </p>
                </div>
            </div>
        );
    }
}

export default About;