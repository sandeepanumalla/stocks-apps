
import './App.css';

import Home from './components/Home';
import {BrowserRouter as Router, Redirect, Route,Switch, useHistory} from 'react-router-dom'
import Views from './components/Views';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/view" component={Views}></Route>
        <Redirect to="/home" />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
