import { Link } from 'react-router-dom';
import './cssstyles/p_teacher.css';
import CanvasJSReact from './canvasjs-3.7.1/canvasjs.react';

const data = [
  { post: 737, time: "4/19/22 8:03pm", subject: "Python course questions", question: "How do I solve this?", ta: "Jack" },
  { post: 737, time: "4/19/22 8:03pm", subject: "Python course questions", question: "How do I solve this?", ta: "Jack" },
  { post: 737, time: "4/19/22 8:03pm", subject: "Python course questions", question: "How do I solve this?", ta: "Jack" },
  { post: 737, time: "4/19/22 8:03pm", subject: "Python course questions", question: "How do I solve this?", ta: "Jack" },
]

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
                { label: "1/12", y: 28  },
                { label: "1/19", y: 20  },
                { label: "1/26", y: 35  },
                { label: "2/2", y: 15  },
                { label: "2/9", y: 12  },
                { label: "2/16", y: 15  },
                { label: "2/23", y: 20  },
                { label: "3/2", y: 25  }
            ]
   }]}

   const pieOptions = {
    title: {
      text: ""
    },
    data: [{				
              type: "pie",
              dataPoints: [
                  { label: "Aanya",  y: 33  },
                  { label: "Pratik", y: 27  },
                  { label: "Nidhi", y: 13  },
                  { label: "Harriet",  y: 52  }
              ]
     }]}


const Pteacher = () => {
  return (
    <div className="App">
      <div className="navbar">
        <h1><Link to="/home">Discussion Forum Analysis</Link> - Python Course</h1>
        <div className="links">
          <Link to="/pstudent" className='link_page'>Student</Link>
          <Link to="/pteacher" className='link_current'>Teacher</Link>
          <Link to="/ptopic" className='link_page'>Topics</Link>
        </div>
      </div>
      
      <div className="TeacherRow1">
        <div className="Contributions_Instructors">
          <h1>Contributions by Instructor</h1>
          <CanvasJSChart options={pieOptions} containerProps={{ width: '90%', height: '80%'}} />
        </div>
        <div className="Average_Response_Time">
          <h1>Average Response Time</h1>
          <CanvasJSChart options={lineOptions} containerProps={{ width: '90%', height: '80%'}} />
        </div>
        <div className="Teacher_Scores">
          <div className="Current_Unresolved_Post">
            <p>Current unresolved posts: <p className="sc_font"> 6 </p></p>
          </div>
          <div className="Today_Average_Response_Time">
            <p>Today's average reply time (mins): <p className="sc_font">25</p></p>
          </div>
          <div className="Current_Unresolved">
            <p>Current unresolved posts: <p className="sc_font"> 25 </p></p>
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

export default Pteacher;
