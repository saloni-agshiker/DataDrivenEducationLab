import { Link } from 'react-router-dom';
import './cssstyles/topic.css';
import CanvasJSReact from './canvasjs-3.7.1/canvasjs.react';
import jsonData from './ai.json';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const testOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Neutral", y: jsonData[0].test[0] },
      { label: "Negative", y: jsonData[0].test[1] },
      { label: "Positive", y: jsonData[0].test[2] }
    ]
  }]
}

const projectOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Neutral", y: jsonData[0].project[0] },
      { label: "Negative", y: jsonData[0].project[1] },
      { label: "Positive", y: jsonData[0].project[2] }
    ]
  }]
}

const quizOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Neutral", y: jsonData[0].quiz[0] },
      { label: "Negative", y: jsonData[0].quiz[1] },
      { label: "Positive", y: jsonData[0].quiz[2] }
    ]
  }]
}

const homeworkOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Neutral", y: jsonData[0].homework[0] },
      { label: "Negative", y: jsonData[0].homework[1] },
      { label: "Positive", y: jsonData[0].homework[2] }
    ]
  }]
}

const gradescopeOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Neutral", y: jsonData[0].gradescope[0] },
      { label: "Negative", y: jsonData[0].gradescope[1] },
      { label: "Positive", y: jsonData[0].gradescope[2] }
    ]
  }]
}

const assignmentOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Neutral", y: jsonData[0].assignment[0] },
      { label: "Negative", y: jsonData[0].assignment[1] },
      { label: "Positive", y: jsonData[0].assignment[2] }
    ]
  }]
}

const Topic = () => {
  return (
    <div className="App">
      <div className="navbar">
        <h1><Link to="/home">Discussion Forum Analysis</Link> - AI Course</h1>
        <div className="links">
          <Link to='/student' className='link_page'>Student</Link>
          <Link to="/teacher" className='link_page'>Teacher</Link>
          <Link to="/topic" className='link_current'>Topics</Link>
        </div>

      </div>

      <div className="Topics_Row_1">
        <div className="Test_Graph">
          <h1>Sentiment Distribution for Tests</h1>
          <CanvasJSChart options={testOptions} containerProps={{ width: '80%', height: '80%'}} />
        </div>
        <div className="Project_Graph">
          <h1>Sentiment Distribution for Projects</h1>
          <CanvasJSChart options={projectOptions} containerProps={{ width: '80%', height: '80%'}} />
        </div>
        <div className="Quiz_Graph">
          <h1>Sentiment Distribution for Quizzes</h1>
          <CanvasJSChart options={quizOptions} containerProps={{ width: '80%', height: '80%'}} />
        </div>
      </div>

      <div className="Topics_Row_2">
        <div className="Homework_Graph">
          <h1>Sentiment Distribution for Homeworks</h1>
          <CanvasJSChart options={homeworkOptions} containerProps={{ width: '80%', height: '80%'}} />
        </div>
        <div className="Gradescope_Graph">
          <h1>Sentiment Distribution for Gradescope</h1>
          <CanvasJSChart options={gradescopeOptions} containerProps={{ width: '80%', height: '80%'}} />
        </div>
        <div className="Assignment_Graph">
          <h1>Sentiment Distribution for Assignments</h1>
          <CanvasJSChart options={assignmentOptions} containerProps={{ width: '80%', height: '80%'}} />
        </div>
      </div>

    </div>
  );
}

export default Topic;
