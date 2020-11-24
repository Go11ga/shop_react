import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';

import userSettings from '@/contexts/userSettings';

import { Card, Row, Col } from 'react-bootstrap';

import styles from './styles.module.css';

export default observer(function(){
    let { products: productsStore, cart: cartStore } = useContext(storesContext);
    let { theme } = useContext(userSettings);

    let productsCards = productsStore.items.map((pr, i) => {
        let inCart = cartStore.inCart(pr.id);
        let inProccess = cartStore.inProccess(pr.id);

        return <Col key={pr.id} className="mt-3 mb-3 col-4">
            <Card>
                <Card.Body className={theme === 'light' ? styles.theme__light : styles.theme__dark}>
                    <Card.Title>
                        <strong>{pr.title}</strong>
                    </Card.Title>
                    <Card.Text>
                        <strong>Price: {pr.price}</strong>
                    </Card.Text>
                    <Link to={'/products/' + pr.id}>
                        Get more...
                    </Link>
                    <hr/>
                    { inCart && <button
                        type="button"
                        className="btn btn-danger"
                        disabled={inProccess}
                        onClick={() => cartStore.remove(pr.id)}>
                            Remove
                        </button> }
                    { !inCart && <button
                        type="button"
                        className="btn btn-success"
                        disabled={inProccess}
                        onClick={() => cartStore.add(pr.id)}>
                            Add to cart
                        </button> }
                </Card.Body>
            </Card>
        </Col>
    });

    return <div className="pb-5">
        <h2 className="mb-3">Products List</h2>
        <Row>{productsCards}</Row>
    </div>
});
