import { Link } from 'react-router-dom';
import './cssstyles/p_student.css';
import CanvasJSReact from './canvasjs-3.7.1/canvasjs.react';
import currsentiment from './curr_class_sentiment.json';
import averagescore from './CS1331_average_grade.json';
import cp from './CS1331_cp_code.json';
import poststd from './1301student_posts_freq.json';

const postbystd = poststd.data[0];

const data = [
  { rank: 1, name: "Pratik Agrawal", score: 82 },
  { rank: 2, name: "Jisan Park", score: 71 },
  { rank: 3, name: "Malav Patel", score: 65 },
  { rank: 4, name: "Aanya Khandelwal", score: 39 },
]

const avg_score = averagescore.average_grade;

const sentiment = currsentiment.curr_class_sentiment_CS1301;

const cpcode = [
  { cp: 0, freq: cp[0] },
  { cp: 1, freq: cp[1] },
  { cp: 2, freq: cp[2] },
  { cp: 3, freq: cp[3] },
  { cp: 4, freq: cp[4] }
]

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const lineOptions = {
  title: {
    text: ""
  },
  axisY:{
    title: "Number of Posts",
  },
  axisX:{
    title: "Date",
  },
  data: [{				
            type: "line",
            dataPoints: [
                { label: "1/15", y: 90  },
                { label: "1/30", y: 52  },
                { label: "2/15", y: 48  },
                { label: "2/28", y: 25  },
                { label: "3/15", y: 51  },
                { label: "3/20", y: 65  },
                { label: "4/15", y: 60  }
            ]
   }]}

   const lineOptions2 = {
    title: {
      text: ""
    },
    axisY:{
      title: "Class Sentiment",
    },
    axisX:{
      title: "Date",
    },
    data: [{				
              type: "line",
              dataPoints: [
                  { label: "01", y: 0.5 },
                  { label: "02", y: 0.4 },
                  { label: "03", y: 0.2 },
                  { label: "04", y: 0.9 },
                  { label: "05", y: 0.9 },
                  { label: "06", y: 0.8 },
                  { label: "07", y: 0.7 }
              ]
            }]
    }
  

   const barOptions = {
    title: {
      text: ""
    },
    axisY:{
      title: "Number of Posts",
    },
    axisX:{
      title: "Number of Students",
    },
    data: [{				
              type: "column",
              dataPoints: [
                  { label: "0-10", y: postbystd['0-10']  },
                  { label: "11-20", y: postbystd['11-20']  },
                  { label: "21-30", y: postbystd['21-30']  },
                  { label: "31-40", y: postbystd['31-40']  },
                  { label: "41-50", y: postbystd['41-50']  }
              ]
     }]}

const Pstudent = () => {
  return (
    <div className="App">
      <div className="navbar">
        <h1><Link to="/home">Discussion Forum Analysis</Link> - Python Course</h1>
        <div className="links">
          <Link to="/pstudent" className='link_current'>Student</Link>
          <Link to="/pteacher" className='link_page'>Teacher</Link>
          <Link to="/ptopic" className='link_page'>Topics</Link>
        </div>

      </div>
      <div className="Student_Row_1">
        <div className="Posts_over_time">
          <h1>
            Post over time
          </h1>
          <CanvasJSChart options={lineOptions} containerProps={{ width: '90%', height: '80%'}} />
        </div>
        <div className="Class_sentiment_over_time">
          <h1>Class Sentiment Over Time</h1>
          <CanvasJSChart options={lineOptions2} containerProps={{ width: '90%', height: '80%'}} />
        </div>
      </div>
      <div className="Student_Row_2">
        <div className="Student_Scores">
          <div className="Current_Class_Sentiment">
            <p>Current class sentiment: <p className="score_font"> {sentiment} </p></p>
          </div>
          <div className="Total_Post_this_week">
            <p>Total posts this week: <p className="score_font"> 32 </p></p>
          </div>
          <div className="Average_Student_Scores">
            <p>Average Score: <p className="score_font"> {avg_score} </p></p>
          </div>
        </div>
        <div className="Customized_Participation_Score">
          <h1>Customized Scores</h1>
          <table>
            <tr>
              <th>CP code</th>
              <th>Frequency</th>
            </tr>
            {cpcode.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.cp}</td>
                  <td>{val.freq}</td>
                </tr>
              )
            })}
          </table>
        </div>
        <div className="Post_by_Student">
          <h1>Post_by_Student</h1>
          <CanvasJSChart options={barOptions} containerProps={{ width: '90%', height: '80%'}} />
        </div>
      </div>
      
    </div>
  );
}

export default Pstudent;
