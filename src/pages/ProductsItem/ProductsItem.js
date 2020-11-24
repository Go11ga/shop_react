import React, { useContext } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { routes, routesMap } from '@/router';

import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';

import userSettings from '@/contexts/userSettings';

import E404 from '@/pages/E404'

import { Button } from 'react-bootstrap';

import styles from './styles.module.css';

export default observer(function(){
    let { products: productsStore, cart: cartStore } = useContext(storesContext);
    let { theme } = useContext(userSettings);
    let { id } = useParams();
    let hasProduct = /^[1-9][0-9]*$/.test(id);
    let product;

    if(hasProduct){
        product = productsStore.item(parseInt(id));

        if(product === undefined){
            hasProduct = false;
        }
    }

    if(!hasProduct){
        return <E404/>
    }

    return <div className={theme === 'light' ? styles.theme__light + " pb-2 mb-4" : styles.theme__dark + " pb-2 mb-4"}>
        <div className="pl-2">
            <h2><b>{ product.title }</b></h2>
            <h3>Price: { product.price }</h3>
            <img src="https://via.placeholder.com/200x400"/>
            <hr/>
            <Button variant="success">
                <NavLink to={routesMap.products} className="text-white">Back to products</NavLink>
            </Button>
        </div>
    </div>
});
