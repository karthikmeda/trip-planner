import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/' : '/trip-planner';
  return (
    <Router basename= {basename}>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element = {<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
