import './cssstyles/home.css';
import { Link } from 'react-router-dom';
 
const Home = () => {
  return (
    <div className="home">
        <div className="home_navbar">
            <h1></h1>
            <div className="h_links">
                <Link to="/pstudent" className='home_link'>Python Course</Link>
                <Link to="/student" className='home_link'>AI Course</Link>
            </div>
        </div> 

        <div className = "empty"></div>
        <div className="title-container">
            <h1>Discussion Forum Analysis</h1>
        </div>
        <div class="flexbox-container">
            <div className="description-container">
                <img src={require('./images/textboxes.png')} />
                <p>
                    Collect and analyze dicussion posts from Piazza or Ed
                </p>
            </div>
            <div className="description-container">
                <img src={require('./images/graph.png')} />
                <p>
                    Display statistics on student and instructor participation and topics
                </p>
            </div>
            <div className="description-container">
                <img src={require('./images/graduationcap.png')} />
                <p>
                    Provide information and insight to improve student learning
                </p>
            </div>
        </div>
    </div>
  );
}
export default Home;