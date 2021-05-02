
import './App.css';

import Home from './components/Home';
import {BrowserRouter as Router, Redirect, Route, useHistory} from 'react-router-dom'
import Views from './components/Views';


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/view" component={Views}></Route>
        
      </Router>
      
    </div>
  );
}

export default App;
