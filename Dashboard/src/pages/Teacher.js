import { Link } from 'react-router-dom';
import './cssstyles/teacher.css';
import CanvasJSReact from './canvasjs-3.7.1/canvasjs.react';
import posttime from './6601instructor_posts.json';
import responstime from './CS6601_weekly_data.json';

const postime = posttime.data[0]
const responsetime = responstime.response_time

const data = [
  { post: 1, time: "4/19/22 8:03pm", subject: "AI course questions", question: "How do I solve this?", ta: "Jack" },
  { post: 2, time: "4/19/22 8:03pm", subject: "AI course questions", question: "How do I solve this?", ta: "Jack" },
  { post: 3, time: "4/19/22 8:03pm", subject: "AI course questions", question: "How do I solve this?", ta: "Jack" },
  { post: 4, time: "4/19/22 8:03pm", subject: "AI course questions", question: "How do I solve this?", ta: "Jack" },
]

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const postot = {
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
                { label: "01", y: postime['2020-02-09'] },
                { label: "02", y: postime['2020-02-13'] },
                { label: "03", y: postime['2020-02-17'] },
                { label: "04", y: postime['2020-02-22'] },
                { label: "05", y: postime['2020-02-26'] },
                { label: "06", y: postime['2020-03-01'] },
                { label: "07", y: postime['2020-03-08'] },
                { label: "08", y: postime['2020-03-12'] },
                { label: "09", y: postime['2020-03-16'] },
                { label: "10", y: postime['2020-03-20'] },
                { label: "11", y: postime['2020-03-27'] },
                { label: "12", y: postime['2020-04-01'] },
                { label: "13", y: postime['2020-04-09'] },
                { label: "14", y: postime['2020-04-24'] },
                { label: "14", y: postime['2020-05-04'] }
            ]
          }]}


const lineOptions = {
  title: {
    text: ""
  },
  axisY:{
    title: "Running Average Response Time (minutes)",
  },
  axisX:{
    title: "Date",
  },
  data: [{				
            type: "line",
            dataPoints: [
                { label: responsetime[0].Week , y: responsetime[0].Time},
                { label: responsetime[1].Week , y: responsetime[1].Time},
                { label: responsetime[2].Week , y: responsetime[2].Time},
                { label: responsetime[3].Week , y: responsetime[3].Time},
                { label: responsetime[4].Week , y: responsetime[4].Time},
                { label: responsetime[5].Week , y: responsetime[5].Time},
                { label: responsetime[6].Week , y: responsetime[6].Time},
                { label: responsetime[7].Week , y: responsetime[7].Time},
                { label: responsetime[8].Week , y: responsetime[8].Time},
                { label: responsetime[9].Week , y: responsetime[9].Time},
                { label: responsetime[10].Week , y: responsetime[10].Time},
                { label: responsetime[11].Week , y: responsetime[11].Time},
                { label: responsetime[12].Week , y: responsetime[12].Time},
                { label: responsetime[13].Week , y: responsetime[13].Time},
                { label: responsetime[14].Week , y: responsetime[14].Time},
                { label: responsetime[15].Week , y: responsetime[15].Time},
                { label: responsetime[16].Week , y: responsetime[16].Time},
                { label: responsetime[17].Week , y: responsetime[17].Time},
                { label: responsetime[18].Week , y: responsetime[18].Time},
                { label: responsetime[19].Week , y: responsetime[19].Time},
                { label: responsetime[20].Week , y: responsetime[20].Time},
                { label: responsetime[21].Week , y: responsetime[21].Time},
                { label: responsetime[22].Week , y: responsetime[22].Time},
                { label: responsetime[23].Week , y: responsetime[23].Time},
                { label: responsetime[24].Week , y: responsetime[24].Time},
                { label: responsetime[25].Week , y: responsetime[25].Time},
                { label: responsetime[26].Week , y: responsetime[26].Time},
                { label: responsetime[27].Week , y: responsetime[27].Time},
                { label: responsetime[28].Week , y: responsetime[28].Time},
                { label: responsetime[29].Week , y: responsetime[29].Time},
                { label: responsetime[30].Week , y: responsetime[30].Time},
                { label: responsetime[31].Week , y: responsetime[31].Time},
                { label: responsetime[32].Week , y: responsetime[32].Time},
                { label: responsetime[33].Week , y: responsetime[33].Time},
                { label: responsetime[34].Week , y: responsetime[34].Time},
                { label: responsetime[35].Week , y: responsetime[35].Time},
                { label: responsetime[36].Week , y: responsetime[36].Time},
                { label: responsetime[37].Week , y: responsetime[37].Time},
                { label: responsetime[38].Week , y: responsetime[38].Time},
                { label: responsetime[39].Week , y: responsetime[39].Time},
                { label: responsetime[40].Week , y: responsetime[40].Time},
                { label: responsetime[41].Week , y: responsetime[41].Time},
                { label: responsetime[42].Week , y: responsetime[42].Time},
                { label: responsetime[43].Week , y: responsetime[43].Time},
                { label: responsetime[44].Week , y: responsetime[44].Time},
                { label: responsetime[45].Week , y: responsetime[45].Time},
                { label: responsetime[46].Week , y: responsetime[46].Time},
                { label: responsetime[47].Week , y: responsetime[47].Time},
                { label: responsetime[48].Week , y: responsetime[48].Time},
                { label: responsetime[49].Week , y: responsetime[49].Time},
                { label: responsetime[50].Week , y: responsetime[50].Time},
                { label: responsetime[51].Week , y: responsetime[51].Time}
            ]
   }]}

const pieOptions = {
    title: {
      text: ""
    },
    data: [{				
              type: "pie",
              dataPoints: [
                  { label: "Aanya",  y: 60  },
                  { label: "Pratik", y: 80  },
                  { label: "Nidhi", y: 13  },
                  { label: "Harriet",  y: 52  }
              ]
     }]}


const Teacher = () => {
  return (
    <div className="App">
      <div className="navbar">
        <h1><Link to="/home">Discussion Forum Analysis</Link> - AI Course</h1>
        <div className="links">
          <Link to="/student" className='link_page'>Student</Link>
          <Link to="/teacher" className='link_current'>Teacher</Link>
          <Link to="/topic" className='link_page'>Topics</Link>
        </div>
      </div>
      
      <div className="TeacherRow1">
        <div className="Contributions_Instructors">
          <h1>Post over Time</h1>
          <CanvasJSChart options={postot} containerProps={{ width: '90%', height: '80%'}} />
        </div>
        <div className="Average_Response_Time">
          <h1>Average Response Time</h1>
          <CanvasJSChart options={lineOptions} containerProps={{ width: '90%', height: '80%'}} />
        </div>
        <div className="Teacher_Scores">
          <div className="Current_Unresolved_Post">
            <p>Current unresolved posts: <p className="sc_font"> 7 </p></p>
          </div>
          <div className="Today_Average_Response_Time">
            <p>Today's average reply time (mins): <p className="sc_font">48</p></p>
          </div>
          <div className="Current_Unresolved">
            <p>Current unresolved posts: <p className="sc_font"> 2 </p></p>
          </div>
        </div>
      </div>
      
      <div className="Unresolved_Posts_Table">
        <h1>Unresolved Posts</h1>
        <table>
            <tr>
              <th>Post</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Question</th>
              <th>Assign TA</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.post}</td>
                  <td>{val.time}</td>
                  <td>{val.subject}</td>
                  <td>{val.question}</td>
                  <td>{val.ta}</td>
                </tr>
              )
            })}
        </table>
    
      </div>

    </div>
  );
}

export default Teacher;
