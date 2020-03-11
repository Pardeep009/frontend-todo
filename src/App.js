import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import ToDoApp from './ToDoApp/ToDoApp';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/signin" component={Signin}></Route>
          <Route exact path="/user/:userid" component={ToDoApp}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
