import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './Home';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <Nav/>
      <div className='body'>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          
        </Routes>
      </div>
   </Router>
  );
}

export default App;
