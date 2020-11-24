import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

import userSettingContext from '@/contexts/userSettings';

import styles from './styles.module.css';

export default observer(function(){
    let { order: orderStore, cart: cartStore } = useContext(storesContext);
    let { cashedTotalCnt, cashedTotalSum } = cartStore;

    let { theme } = useContext(userSettingContext);

    return <div className={theme === 'light'
                ? styles.theme__light + " p-1"
                : styles.theme__dark + " p-1"}>
        <h2>Result</h2>
        <div>
            <div><strong>Hello, { orderStore.getValue('name')} !</strong></div>
            <div><strong>InCart: { cashedTotalCnt }</strong></div>
            <div><strong>Total: { cashedTotalSum }</strong></div>
            <hr/>
            <Link to={routesMap.products}>Back to products</Link>
        </div>
    </div>
});
