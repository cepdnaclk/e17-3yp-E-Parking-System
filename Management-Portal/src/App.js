import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Routing
import PrivateRoute from './components/privateRout';


import Navbar from './components/navbar.component';
import privateScreen from './components/privetscreen.component';
import AddUser from './components/AddUsers.component';
import AllUsers from './components/AllUsers.component';
import Login from './components/UserLogin.component';
function App() {
  return (
    <Router>
      <div>
      <Navbar/>
      <Switch>
        <PrivateRoute path="/private" exact component={privateScreen} />
        <Route path="/add" exact component={AddUser} />
        <Route path="/login" exat component={Login} />
        <Route path="/all" exact component={AllUsers} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
