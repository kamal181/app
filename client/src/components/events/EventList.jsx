import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
import {formattedDate} from '../../utils/helpers';


const EventList = (props) => {

    const [show, setShow] = useState(false);
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ⛏️⛏️ CREATE AN EVENT 
    const createAnEvent = async () => {
        try {
            setIsLoading(true);
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/event`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });
            console.log("Create An Event - ", response);
            setEvent({});
            setShow(false);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
        // console.log(event);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAnEvent();
        props.updateList(true);
    }
    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
        // console.log(event);
    }

    // ⛏️⛏️ DELETE AN EVENT 
    const deleteEvent = async (e, id) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${hostname}/api/event/${id}`, { method: "DELETE", credentials: "include" });
            props.updateList(true);
            setIsLoading(false);
            console.log("Delete event - ", response);
        } catch (error) {
            console.log(error);
        }

    }

    const listenKeypress = async e => {
        // e.preventDefault();
        if (e.key === 'Enter' && !e.repeat) {
            console.log("Event - ", event);
            await createAnEvent();
            props.updateList(true);
        }
    }


    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    useEffect(() => {

        document.addEventListener('keydown', listenKeypress);
        return () => {
            document.removeEventListener('keydown', listenKeypress);
        }
    });

    return (
        <div className="EventList ml-2">
            <h2 className="h2">All EventList</h2>
            {isAuthenticated && (
                <div className="create-new-event mb-2">
                    <Button variant="primary" onClick={handleShow}>  Create new event</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} placeholder="Enter title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" className="form-control" id="date" name="date" onChange={handleChange} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}

            {props.isLoading || isLoading ? <Loader /> : (
                <table className="table">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Details </th>
                            {isAuthenticated && <th scope="col">Handle</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.eventList && props.eventList.map((pe, index) => (
                            <tr key={index}>
                                <th >{pe.title}</th>
                                <td>{formattedDate(pe.date)}</td>
                                <td>{props.pageFor !== "home" ? <Link to={`/admin/dashboard/event/${pe._id}`} className='text-white btn btn-primary'>Edit Details</Link> : <Link to={`/event/${pe._id}`} className="btn btn-primary">View Details</Link>}</td>
                                {props.pageFor !== "home" && <td><button className="btn btn-danger" onClick={e => deleteEvent(e, pe._id)} >Delete</button></td>}
                            </tr>)
                        )}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default EventList;
