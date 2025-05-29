import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import RegPage from './pages/RegPage';
import LessonsPage from './pages/LessonsPage';
import TrainerPage from './pages/TrainerPage';
import Dashboard from './pages/Dashboard';
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import Lesson_1 from './lesson_pages/Lesson_1';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
        <Router>
        <div className='page-container'>
          <Header />
          <main className='main-container'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/lessons' element={<LessonsPage />} />
              <Route path='/trainer' element={<TrainerPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<AuthPage />} />
              <Route path='/register' element={<RegPage />} />
              <Route path='/lesson/1' element={<Lesson_1 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
