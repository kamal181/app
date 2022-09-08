import React, { useState, useEffect } from 'react';
import { hostname } from '../../utils/global';
import { Button, Modal } from "react-bootstrap";
import Loader from '../elements/Loader';
import ModalElement from '../elements/ModalElement';

const Participants = (props) => {



    const [show, setShow] = useState(false);
    const [csvShow, setCsvShow] = useState(false);
    const [participant, setPartitipant] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorList, setErrorList] = useState([]);
    const handleClose = () => {
        setErrorList([]);
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleCsvClose = () => setCsvShow(false);
    const handleCsvShow = () => setCsvShow(true);

    // ⛏️⛏️ ADD A PARTICIPANT
    const handleSaveParticipant = async (e) => {
        e.preventDefault();
        setErrorList([]);

        try {
            const options = {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(participant)
            }
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/performance/${props.eventID}`, options);
            console.log("Add participant & performance [Participants.jsx] - ", response);
            const text = await response.text();
            const jsonRes = JSON.parse(text);
            // console.log(jsonRes.errors.length);
            if (jsonRes.errors) {
                if (jsonRes.errors.length >= 1) {
                    setErrorList([...jsonRes.errors]);
                }
            } else {
                // console.log(jsonRes);
                props.updateEvent(true);
                setShow(false);
                // if (response.status = 200) {
                // } 
                console.log("Status - ", response.status);
                setPartitipant({});
            }


            console.log(participant);

            // console.log(jsonRes.errors);

        } catch (error) {
            console.log(error);
        }
    };







    // ⛏️⛏️GETTING INPUT VALUE ON CHANGING ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    function handleChange(evt) {
        setPartitipant({
            ...participant,
            [evt.target.name]: evt.target.value
        });
        // console.log(participant);
    }

    // ⛏️⛏️DELETE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
    const deleteParticipant = async (e, id) => {
        e.preventDefault();
        try {
            // console.log("HIT. ", id);
            // console.log(JSON.parse(localStorage.getItem('user')));
            const checkUser = JSON.parse(localStorage.getItem('user'));
            if (checkUser.role === "SUPER") {
                // http://localhost:4000/api/admin/dashboard/participant
                const response = await fetch(`${hostname}/api/performance/${id}`, {
                    method: "DELETE",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    console.log("Delete participant [Participant.jsx] - ", response);
                    props.updateEvent(true);
                }
            } else {
                // SHOW ERROR YOU CAN DELETE ANY PARTICIPANT 
                setErrorList(prevState => [...prevState, { msg: "Only super admin is able to delete any participant." }]);
                // console.log(errorList);
            }

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorList([]);
        }, 3000);
        return () => clearTimeout(timer);
    }, [errorList])





    // ⛏️⛏️ ON CHANGE EVENT AND SET VALUE FOR A FILE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    function handleCsvChange(e) {
        e.preventDefault();
        // console.log("E - ",  e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }


    // ⛏️⛏️ SUBMIT FILE TO THE DATABASE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    async function submitCsvUpload(e) {
        e.preventDefault();
        // console.log(participant);
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            for (let k of formData.entries()) {
                console.log(k);
            }

            const options = {
                method: "POST",
                credentials: 'include',
                body: formData
            };
            // http://localhost:4000/api/admin/dashboard/participant
            const response = await fetch(`${hostname}/api/performance/multiple/${props.eventID}`, options);
            console.log("Upload multiple participant[Participant.jsx] - ", response);
            const text = await response.text();
            const json = JSON.parse(text);
            // console.log(json);
            if (json.errors) {
                setErrorList([...json.errors]);
            }
            props.updateEvent(true);
        } catch (error) {
            console.log(error);
        }
        setCsvShow(false);
    }






    if (props.participants) {
        return (
            <div className="Participants">
                <h2 className="h2">{props.event.title}</h2>



                {props.participants.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover participant-table">
                            <thead className="bg-dark text-light">
                                <tr>
                                    <th scope="col">SL</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Cell</th>
                                    <th scope="col">Birthdate</th>
                                    <th scope="col">Payment Amount</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.participants.map((p, i) => (
                                    <tr key={i}>
                                        <td >{i + 1}</td>
                                        <td>{p.firstname + " " + p.lastname}</td>
                                        <td>{p.email}</td>
                                        <td>{p.cell}</td>
                                        <td>{p.birthdate}</td>
                                        <td>{p.payment_amount}</td>
                                        <td>{p.payment_method}</td>
                                        <td>{p.city}</td>
                                        {/* <td><button className="btn btn-danger" onClick={e => deleteParticipant(e, p._id)}>Delete</button></td> */}
                                        <td>
                                            <ModalElement
                                                btnColor="danger"
                                                openBtn="Delete"
                                                modalTitle="Alert"
                                                modalBody={<div>If you have sorted them in a round, please mark them as "left" rather than delete!</div>}
                                                failureBtn="Cancel"
                                                successBtn="Yes"
                                                successModal={e => deleteParticipant(e, p._id)}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


                <div className="upload-single-participant">
                    {errorList && [...new Set(errorList)].map((e, i) => <p key={i} className="text-danger">{e.msg}</p>)}

                    <h3 className="h3">Add participants for this events</h3>

                    <Button variant="primary" onClick={handleShow}>
                        Add participants
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.event.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {errorList && [...new Set(errorList)].map((e, i) => <p key={i} className="text-danger">{e.msg}</p>)}
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
                                    <input type="text" className="form-control" id="emailID" value={props.event._id} readOnly name="eventID" />
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

                </div>
                <div className="upload-multiple-participant">
                    <h3 className="h3">Add participants From CSV</h3>

                    <Button variant="primary" onClick={handleCsvShow}>
                        Add CSV
                    </Button>

                    <Modal show={csvShow} onHide={handleCsvClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.event.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* // firstname,lastname,email,cell,birthdate,city, eventID */}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="firstname">Upload CSV File</label>
                                    <input type="file" className="form-control" id="csvFile" name="csv-file" onChange={handleCsvChange} />
                                </div>
                                <div className="form-group d-none">
                                    <input type="text" className="form-control" id="csvFileEventID" value={props.event._id} readOnly name="eventID" />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCsvClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={submitCsvUpload}  >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Participants">No Participants</div>
        );
    }
}

export default Participants;
