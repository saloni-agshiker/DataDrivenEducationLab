import './App.css';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Topic from './pages/Topic';
import Pstudent from './pages/P_student';
import Pteacher from './pages/P_teacher';
import Ptopic from './pages/P_topics';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path='student' element={<Student />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="topic" element={<Topic />} />
        <Route path='pstudent' element={<Pstudent />} />
        <Route path="pteacher" element={<Pteacher />} />
        <Route path="ptopic" element={<Ptopic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
