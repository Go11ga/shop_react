import React, { useContext } from 'react';

import { observer } from 'mobx-react';
import storesContext from '@/contexts/stores';

export default observer(function(){
    let { cart: cartStore } = useContext(storesContext);
    let { totalCnt, totalSum } = cartStore;

    return <div className="cart-stat">
        <div><strong>In Cart: { totalCnt }</strong></div>
        <div><strong>Total: { totalSum }</strong></div>
    </div>
});
