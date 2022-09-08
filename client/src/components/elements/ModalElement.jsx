import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalElement = (props) => {
    /*
    return (
        <div className='ModalElement'>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={props.openModal}>
                {props.openBtn}
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.closeModal} ></button>
                        </div>
                        <div className="modal-body">
                            {props.modalBody}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.closeModal}>{props.failureBtn}</button>
                            <button type="button" className="btn btn-primary" onClick={props.successModal} >{props.successBtn}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )*/

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        
    };
    const handleShow = () => {
        setShow(true);
    };

    return (
        <div className='ModalElement'>
            <Button variant={props.btnColor} onClick={handleShow}>
                {props.openBtn}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {props.failureBtn}
                    </Button>
                    <Button variant="primary" onClick={props.successModal}>
                        {props.successBtn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalElement;
