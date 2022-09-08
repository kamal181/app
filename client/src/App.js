// ⛏️⛏️ MAIN APP FILE 
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css';
// import { Switch, Route, Redirect } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from "./components/elements/Menu";
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import React, { Component } from 'react';
import { hostname } from "./utils/global";
import Page404 from './pages/Page404';
import SingleEvent from './components/events/SingleEvent';
import Score from './components/score/Score';
import AdminList from './components/admin/AdminList';


class App extends Component {
  constructor(props) {
    super(props);
    this.isMountedValue = false;
    this.state = {
      isLoading: false,
      isAuthenticated: this.checkAuth,
      currentEventId: null
    };
    this.getAuthenticatedUser = this.getAuthenticatedUser.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }


  checkAuth = () => {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  authValidation = (isAuthenticated) => {
    this.setState({ isAuthenticated })
  }

  // ⛏️⛏️ GET AUTHENTICATED USER 
  async getAuthenticatedUser() {
    try {
      this.isMountedValue = true;
      this.setState({ isLoading: true });
      const response = await fetch(`${hostname}/api/admin/dashboard`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });
    console.log(response)

      const textRes = await response.text();
      const jsonRes = await JSON.parse(textRes);
      // console.log("User - ",jsonRes.user);
      if (this.isMountedValue) {
        if (jsonRes.user) {
          this.setState({ isAuthenticated: true });
          if (!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(jsonRes.user));
          }
        } else {
          this.setState({ isAuthenticated: false });
          if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
          }
        }
      }
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }


  componentDidMount() {
    // console.log("Auth - ",this.state.isAuthenticated);
    this.getAuthenticatedUser();
  }



  // NEVER UPDATE STATE INSIDE COMPONENT DID UPDATE 
  // PROBLEM WITH THIS AS WELL 
  /*
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("Previous props - ", prevProps);
    // console.log("Previous State - ", prevState.isAuthenticated + " Current state - ", this.state.isAuthenticated);

    // this.getAuthenticatedUser(); // INSIDE GET AUTHENTICATED STATE IS BEING UPDATING 
    // check whether client has changed

    if (prevState.isAuthenticated !== this.state.isAuthenticated) {
      this.getAuthenticatedUser();
    }
    // debugger;
  }
  */

  componentWillUnmount() {
    // console.log("Appjs unmounted");
    this.isMountedValue = false;
    this.setState({ isAuthenticated: false });
  }
  render() {
    // console.log("Authenticated - " , this.state.isAuthenticated);
    return (
      <div className="App">
        <Menu authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/admin" element={<Admin authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />}></Route>
          {/* <Route path="/admin">
            {this.state.isAuthenticated === true ? <Redirect to="/admin/dashboard" /> : <Admin authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />}
          </Route> */}
          <Route path="/admin/list" element={ <AdminList /> }></Route>
          <Route path="/admin/dashboard" element={ <Dashboard authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} />}></Route>
          {/* <Route path="/admin/dashboard">
            {this.state.isAuthenticated === true ? <Dashboard authValidation={this.authValidation} isAuthenticated={this.state.isAuthenticated} /> : <Redirect to="/admin" />}
          </Route> */}
          <Route path="/admin/dashboard/event/:id" element={<SingleEvent isAuthenticated={this.state.isAuthenticated} />}></Route>
          {/* <Route path="/admin/dashboard/event/:id" >
            <SingleEvent isAuthenticated={this.state.isAuthenticated} />
          </Route> */}
          <Route path="/event/:id" element={<Score admin={false} />}></Route>
          {/* <Route path="/event/:id" >
            <Score admin={false} />
          </Route> */}
          <Route path="/home" element={<Page404 />}></Route>
          {/* <Route path="*">
            <Page404 />
          </Route> */}
        </Routes>
      </div>
    );
  }
}

export default App;






