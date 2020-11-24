import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalWin({modalIsShown, closeModal}){
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        closeModal();
    };
    const handleShow = () => setShow(true);

    useEffect(()=>{
        setShow(modalIsShown);
    }, [modalIsShown]);


    let { order: orderStore, cart: cartStore } = useContext(storesContext);
    let { userData } = orderStore;
    let { clean } = cartStore;

    return <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Please confirm:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Name: <b>{userData.name.value}</b></p>
                <p>Email: <b>{userData.email.value}</b></p>
                <p>Phone: <b>{userData.phone.value}</b></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Link className="btn btn-primary" to={routesMap.result} onClick={()=>{clean()}}>
                    Send
                </Link>
            </Modal.Footer>
        </Modal>
    </div>
}

ModalWin.propTypes = {
    modalIsShown: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ModalWin;



