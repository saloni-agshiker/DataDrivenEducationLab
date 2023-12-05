import { Link } from 'react-router-dom';
import './cssstyles/student.css';
import CanvasJSReact from './canvasjs-3.7.1/canvasjs.react';
import currsentiment from './curr_class_sentiment.json';
import averagescore from './CS6601_average_final_grade.json';
import cp from './CS6601_cp_code.json';
import sentimentovertime from './weekly_avg_CS6601.json';
import po from '././6601student_posts.json';
import poststd from './6601student_posts_freq.json';
import studentpost from './CS6601_postsPerMonth.json';

const postbystd = poststd.data[0];

const postovertime = po.data[0]

const data = [
  { rank: 1, name: "Pratik Agrawal", score: 82 },
  { rank: 2, name: "Jisan Park", score: 71 },
  { rank: 3, name: "Malav Patel", score: 65 },
  { rank: 4, name: "Aanya Khandelwal", score: 39 },
]

const avg_score = averagescore;

const sentiment = currsentiment.curr_class_sentiment_CS6601;

const cpcode = [
  { cp: 0, freq: cp[0] },
  { cp: 1, freq: cp[1] },
  { cp: 2, freq: cp[2] },
  { cp: 3, freq: cp[3] },
  { cp: 4, freq: cp[4] },
]

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const lineOptions2 = {
  title: {
    text: ""
  },
  axisY:{
    title: "Class Sentiment",
  },
  axisX:{
    title: "Week",
  },
  data: [{				
            type: "line",
            dataPoints: [
                { label: "01", y: sentimentovertime.week01 },
                { label: "02", y: sentimentovertime.week02 },
                { label: "03", y: sentimentovertime.week03 },
                { label: "04", y: sentimentovertime.week04 },
                { label: "05", y: sentimentovertime.week05 },
                { label: "06", y: sentimentovertime.week06 },
                { label: "07", y: sentimentovertime.week07 },
                { label: "08", y: sentimentovertime.week08 },
                { label: "09", y: sentimentovertime.week09 },
                { label: "10", y: sentimentovertime.week10 },
                { label: "11", y: sentimentovertime.week11 },
                { label: "12", y: sentimentovertime.week12 },
                { label: "13", y: sentimentovertime.week13 },
                { label: "14", y: sentimentovertime.week14 }
            ]
          }]}

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
              { label: studentpost[0].Month, y: studentpost[0].post_count },
              { label: studentpost[1].Month, y: studentpost[1].post_count },
              { label: studentpost[2].Month, y: studentpost[2].post_count },
              { label: studentpost[3].Month, y: studentpost[3].post_count },
              { label: studentpost[4].Month, y: studentpost[4].post_count }
              
            ]
   }]}

   const barOptions = {
    title: {
      text: ""
    },
    axisY:{
      title: "Number of Posts",
    },
    axisX:{
      title: "Type of Post",
    },
    data: [{				
              type: "column",
              dataPoints: [
                  { label: "Statement", y: 4100 },
                  { label: "Question", y: 2800 }
              ]
     }]}

const Student = () => {
  return (
    <div className="App">
      <div className="navbar">
      <h1><Link to="/home">Discussion Forum Analysis</Link> - AI Course</h1>
        <div className="links">
          <Link to="/student" className='link_current'>Student</Link>
          <Link to="/teacher" className='link_page'>Teacher</Link>
          <Link to="/topic" className='link_page'>Topics</Link>
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
            <p>Total posts this week: <p className="score_font"> 28 </p></p>
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
          <h1>Frequency of Question vs Statement</h1>
          <CanvasJSChart options={barOptions} containerProps={{ width: '90%', height: '80%'}} />
        </div>
      </div>
      
    </div>
  );
}

export default Student;
