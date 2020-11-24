import React from 'react';
import PropTypes from 'prop-types';

import CounterReal from '@/components/counters/minmax';

import { Button } from 'react-bootstrap';

function CartItem({ id, title, price, rest, cnt, onChange, onRemove, disabled }){
    let change = (current) => onChange(id, current);
    let remove = () => onRemove(id);

    return <tr>
        <td className="text-left">{ title }</td>
        <td>{ price }</td>
        <td>
            <CounterReal
                max={rest}
                current={cnt}
                onChange={change}
            />
        </td>
        <td>{ price * cnt }</td>
        <td>
            <Button variant="danger" onClick={remove} disabled={disabled}>X</Button>
        </td>
    </tr>
}

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rest: PropTypes.number.isRequired,
    cnt: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default React.memo(CartItem);












