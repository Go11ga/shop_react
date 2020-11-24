import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

import userSettings from '@/contexts/userSettings';

import CartItem from '@/pages/Cart/CartItem';

import styles from './styles.module.css';

export default observer(function(){
    let { cart: cartStore } = useContext(storesContext);
    let { productsDetailed: products, totalCnt, totalSum, change, remove, inProccess } = cartStore;
    let { theme } = useContext(userSettings);

    let productsRows = products.map((pr, i) => {
        return <CartItem key={pr.id}
            {...pr}
            onChange={change}
            onRemove={remove}
            disabled={inProccess(pr.id)}
        />
    });

    return  <div className={theme === 'light'
                            ? styles.theme__light + " p-1"
                            : styles.theme__dark + " p-1"}>
        <h2>Cart</h2>
        <table className={theme === 'light'
                          ? "table table-bordered text-center"
                          : "table table-bordered table-dark text-center"}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { productsRows }
            </tbody>
        </table>
        <hr/>
        <div><strong>InCart: { totalCnt }</strong></div>
        <div><strong>Total: { totalSum }</strong></div>
        <div><Link className="btn btn-success" to={routesMap.order}>Send</Link></div>
    </div>
});
