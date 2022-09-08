import React, { Component } from 'react';
import { hostname } from '../utils/global';
import EventList from '../components/events/EventList';
// import icon from "/icon/extra.svg";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            isAuthenticated: false,
            isLoading: false
        };
        this.getAllEvents = this.getAllEvents.bind(this);
        this.getEventID = this.getEventID.bind(this);
    }

    // ⛏️⛏️ FETCH ALL EVENTS 
    async getAllEvents() {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" }, credentials: "include" };
            this.setState({ isLoading: true });
            const response = await fetch(`${hostname}/api/event`, options);
            // console.log("Getting all event - ",response);
            const text = await response.text();
            // console.log("Text - ", text);
            const jsonResponse = await JSON.parse(text);
            // console.log(jsonResponse);
            this.setState({
                eventList: jsonResponse.events,
                isLoading: false
            });


            // console.log("JSON - ", jsonResponse.events);
        } catch (error) {
            console.log(error);
        }
    }



    getEventID(id) {
        console.log("Event ID - ", id);
        // this.setState({ currentEventID: id });
        // this.getSingleEvent();
    }


    async componentDidMount() {
        this.getAllEvents();

        // console.log("JSON - ", this.state.eventList);
        // https://github.com/MdSamsuzzohaShayon/mern-graphql-events-booking/blob/8_optamize_bugfix_chart/frontend/src/pages/Events.jsx
        // try {
        //     const response = await fetch(`${hostname}/api/home`);
        //     const result = await response.text();
        //     this.setState({
        //         eventList: result
        //     });
        //     console.log(result);
        // } catch (error) {
        //     console.log(error);
        // }

    }

    render() {
        return (
            <div className="Home">
                <i className="bi bi-plus-lg"></i>            
                <div className="container mt-3">
                    <EventList isLoading={this.state.isLoading}
                        pullEventID={this.getEventID}
                        eventList={this.state.eventList}
                        pageFor="home" />
                    {/* <Events isLoading={this.state.isLoading} pullEventID={this.getEventID} eventList={this.state.eventList} /> */}
                </div>
            </div>
        )
    }
}

export default Home;
