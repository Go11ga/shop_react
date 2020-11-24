import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';

import userSettings from '@/contexts/userSettings';

import AppModal from '@/components/modal'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './styles.module.css';


function Order(){
    let { order: orderStore } = useContext(storesContext);
    let { userData, allValid: formReady, change } = orderStore;
    let { theme } = useContext(userSettings);
    let formFields = [];

    let [modalIsShown, setModalIsShown] = useState(false);

    let showModal = () => {
        setModalIsShown(true);
    }

    let closeModal = () => {
        setModalIsShown(false);
    }

    for(let name in userData){
        let field = userData[name];
        formFields.push(
            <Form.Group key={name}>
                <Form.Label>{ field.title }</Form.Label>
                <Form.Control
                    type="text"
                    value={ field.value }
                    onChange={(e) => change(name, e.target.value.trim())}
                    className={theme === 'light' ? styles.theme__light : styles.theme__dark}
                />
                {
                    field.valid === false &&
                    <Form.Text className="text-danger">
                        { field.errorText }
                    </Form.Text>
                }
            </Form.Group>
        );
    }

    return <div className={theme === 'light'
                            ? styles.theme__light + " p-1"
                            : styles.theme__dark + " p-1"}>
        <h2>Order</h2>
        <Form>
            { formFields }
        </Form>
        <div>
            <Link className="btn btn-warning mr-1" to={routesMap.cart}>Back</Link>
            <Button variant="success" onClick={showModal} disabled={!formReady}>Send</Button>
            <AppModal modalIsShown={modalIsShown} closeModal={closeModal}/>
        </div>
    </div>
}

export default observer(Order);















