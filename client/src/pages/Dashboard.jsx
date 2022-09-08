/* ⛏️⛏️ SHOW ALL EVENTS, PARTICIPANT   */

import React, { Component } from 'react';
import { hostname } from '../utils/global';
import EventList from '../components/events/EventList';
import { Navigate } from 'react-router-dom';
import "../style/Dashboard.css";
import { Link } from 'react-router-dom';

export class Dashboard extends Component {
    constructor(props) {
        super(props);


        this.isMountedValue = false;
        this.state = {
            activeTab: "events",
            eventList: [],
            isLoading: false,
        };

        // this.getSingleEvent = this.getSingleEvent.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    // ⛏️⛏️ FETCH ALL EVENTS 
    async getAllEvents() {
        try {
            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/event`, { method: "GET", credentials: "include" });
            console.log("Get all events [Dashboard.jsx] - ", response);
            const text = await response.text();
            // console.log(text);
            const jsonResponse = await JSON.parse(text);
            // console.log(jsonResponse);
            if (this.isMountedValue) {
                this.setState({
                    eventList: jsonResponse.events,
                    isLoading: false
                });
            }

            // console.log("JSON - ", jsonResponse.events);
        } catch (error) {
            console.log(error);
        }
        // if (this.props.isAuthenticated) {
        // }
    }


    componentDidMount() {
        this.isMountedValue = true;
        this.getAllEvents();

    }
    updateList = (update) => { if (update) this.getAllEvents() };
    // updateList = (update) => { if (update) this.getAllEvents() };





    componentWillUnmount() {
        this.isMountedValue = false;
        this.props.authValidation(false);
        // console.log("Unmounted- ", this.props.isAuthenticated);
        this.setState({
            currentEvent: null,
            eventList: []
        });
    }

    render() {
        if (localStorage.getItem('user')) {
            return (
                <div className="Dashboard">
                    <div className="container">
                        <br />
                        <Link className="btn btn-primary" to="/admin/list">Admin List</Link>
                        <br />
                        <br />
                        <EventList
                            isLoading={this.state.isLoading}
                            updateList={this.updateList}
                            eventList={this.state.eventList}
                            pageFor="dashobard" />
                    </div>
                </div>
            );
        } 
        else {
            return <Navigate to="/admin" />
        }
    }
}




export default Dashboard;
