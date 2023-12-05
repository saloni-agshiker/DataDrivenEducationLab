import { Link } from 'react-router-dom';
import './cssstyles/p_topics.css';
import CanvasJSReact from './canvasjs-3.7.1/canvasjs.react';
import jsonData from './py.json';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const testOptions = {
  title: {
    text: ""
  },
  data: [{
    type: "pie",
    dataPoints: [
      { label: "Positive", y: jsonData[0].test[1] * 100 },
      { label: "Negative", y: jsonData[0].test[0] * 100 },
      { label: "Neutral", y: jsonData[0].test[2] * 100 }
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
      { label: "Positive", y: jsonData[0].project[1] * 100 },
      { label: "Negative", y: jsonData[0].project[0] * 100 },
      { label: "Neutral", y: jsonData[0].project[2] * 100 }
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
      { label: "Positive", y: jsonData[0].quiz[1] * 100 },
      { label: "Negative", y: jsonData[0].quiz[0] * 100 },
      { label: "Neutral", y: jsonData[0].quiz[2] * 100 }
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
      { label: "Positive", y: jsonData[0].homework[1] * 100 },
      { label: "Negative", y: jsonData[0].homework[0] * 100 },
      { label: "Neutral", y: jsonData[0].homework[2] * 100 }
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
      { label: "Positive", y: jsonData[0].gradescope[1] * 100 },
      { label: "Negative", y: jsonData[0].gradescope[0] * 100 },
      { label: "Neutral", y: jsonData[0].gradescope[2] * 100 }
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
      { label: "Positive", y: jsonData[0].assignment[1] * 100 },
      { label: "Negative", y: jsonData[0].assignment[0] * 100 },
      { label: "Neutral", y: jsonData[0].assignment[2] * 100 }
    ]
  }]
}

const Ptopic = () => {
  return (
    <div className="App">
      <div className="navbar">
        <h1><Link to="/home">Discussion Forum Analysis</Link> - Python Course</h1>
        <div className="links">
          <Link to='/pstudent' className='link_page'>Student</Link>
          <Link to="/pteacher" className='link_page'>Teacher</Link>
          <Link to="/ptopic" className='link_current'>Topics</Link>
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

export default Ptopic;
