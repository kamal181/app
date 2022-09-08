import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { hostname } from '../../utils/global';


function AddParticipant(props) {
    let controller = new AbortController();


    const [show, setShow] = useState(false);
    const [participant, setPartitipant] = useState({});
    const [errors, setErrors] = useState([]);



    const handleClose = () => {
        setErrors([]);
        setShow(false)
    };
    const handleShow = () => setShow(true);


    // ⛏️⛏️GETTING INPUT VALUE ON CHANGING  
    function handleChange(evt) {
        setPartitipant({
            ...participant,
            [evt.target.name]: evt.target.value
        });
    }


    // ⛏️⛏️ ADD A PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const handleSaveParticipant = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const options = {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(participant),
                signal: controller.signal
            }
            // console.log("props");
            // console.log(props);
            // http://localhost:9290/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/performance/${props.eventID}`, options);
            console.log("Add participant - ", response);
            const text = await response.text();
            const jsonRes = JSON.parse(text);
            if (jsonRes.errors) {
                if (jsonRes.errors.length > 1) {
                    setErrors([...jsonRes.errors]);
                }
                controller = null;
            } else {
                // console.log("JSON - ",jsonRes);
                // props.updateEvent(true);
                props.handleSaveParticipant(jsonRes);
                setShow(false);
                setPartitipant({});
                controller = null;

            }

        } catch (error) {
            console.log(error);
        }
    };


    // useEffect(() => {
    //     return () => controller?.abort();
    // });
    return (
        <React.Fragment>

            <h3 className="h3">Add participants for this events</h3>
            {errors && [...new Set(errors)].map((e, i) => <p key={i} className="text-warning">{e.msg}</p>)}

            <Button variant="primary" onClick={handleShow}>
                Add participants
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Some event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errors && [...new Set(errors)].map((e, i) => <p key={i} className="text-danger">{e.msg}</p>)}
                    {/* // firstname,lastname,email,cell,birthdate,city, eventID */}
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name*</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" onChange={handleChange} placeholder="Enter Your First name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name*</label>
                            <input type="text" className="form-control" id="lastname" name="lastname" onChange={handleChange} placeholder="Enter Your Last Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname">Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} placeholder="Enter Your Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cell">Phone</label>
                            <input type="text" className="form-control" id="cell" name="cell" onChange={handleChange} placeholder="Enter Your Phone Number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthdate">Birthdate</label>
                            <input type="date" className="form-control" id="birthdate" name="birthdate" onChange={handleChange} placeholder="Enter Your Birthdate" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment_amount">Payment Amount</label>
                            <input type="text" className="form-control" id="payment_amount" name="payment_amount" onChange={handleChange} placeholder="Enter Your Payment Amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment_method">Payment Method</label>
                            <select className="form-control" id="payment_method" name="payment_method" onChange={handleChange}>
                                <option value="Cash">Cash</option>
                                <option value="Check">Check</option>
                                <option value="Venmo">Venmo</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City*</label>
                            <input type="text" className="form-control" id="city" name="city" onChange={handleChange} placeholder="Enter Your City" />
                        </div>

                        <div className="form-group d-none">
                            <input type="text" className="form-control" id="emailID" value={props.eventID} readOnly name="eventID" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveParticipant}  >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default AddParticipant
