import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';

import storesContext from '@/contexts/stores';
import stores from '@/store';

stores.cart.load();

stores.products.load().then(() => {
    ReactDOM.render(
        <storesContext.Provider value={stores}>
            <App/>
        </storesContext.Provider>,
        document.querySelector('#app')
    );
});

import 'bootstrap/dist/css/bootstrap.min.css';
