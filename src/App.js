import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from "./Home";
import About from "./About-Us";
import Contact from "./Contact-Us";
import SignUp from "./Sign-Up";
import Admin from "./Admin";
import UserIn from "./User";
import UserProfile from "./User-Profile";
import CreateOrder from "./Create-Order";
import GetAllOrders from "./Get-All-Orders";
import OrderDetails from "./Order-Details";
import AdminProfile from "./Admin-Profile";
import AppOrderDetails from "./App-Order-Details";
import GetAllAppOrders from "./Get-All-App-Orders";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about-us" component={About}></Route>
        <Route path="/contact-us" component={Contact}></Route>
        <Route path="/sign-up" component={SignUp}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/user-profile" component={UserProfile}></Route>
        <Route path="/user" component={UserIn}></Route>
        <Route path="/create-order" component={CreateOrder}></Route>
        <Route path="/all-orders" component={GetAllOrders}></Route>
        <Route path="/order/:id" component={OrderDetails}></Route>
        <Route path="/admin-profile" component={AdminProfile}></Route>
        <Route path="/app-order/:id" component={AppOrderDetails}></Route>
        <Route path="/all-app-orders" component={GetAllAppOrders}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
