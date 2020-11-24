import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import userSettingContext from '@/contexts/userSettings';

import Button from 'react-bootstrap/Button'
import styles from './styles.module.css';

function Counter({ min, max, current, onChange }){
    let { theme } = useContext(userSettingContext);
    let input = useRef();

    let applyCurrent = (newCnt) => {
        let newCurrent = Math.max(Math.min(newCnt, max), min);
        input.current.value = newCurrent;

        if(newCurrent != current){
            onChange(newCurrent);
        }
    };

    let increase = () => applyCurrent(current + 1);
    let decrease = () => applyCurrent(current - 1);

    let setValue = () => {
        let cnt = parseInt(input.current.value);
        applyCurrent(isNaN(cnt) ? min : cnt);
    }

    let checkEnter = (e) => {
        if(e.keyCode === 13){
            setValue();
        }
    }

    useEffect(() => {
        if(input.current.value !== current.toString()){
            input.current.value = current;
        }
    }, [current]);

    useEffect(() => {
        if(current > max || current < min){
            setValue();
        }
    }, [min, max]);

    return <div>
        <Button variant="warning" onClick={decrease} disabled={ current <= min }>-</Button>
        <input type="text"
                defaultValue={current}
                onBlur={setValue}
                onKeyDown={checkEnter}
                className={theme === 'light' ? styles.input__light : styles.input__dark}
                ref={input}
        />
        <Button
            variant="success"
            onClick={increase}
            disabled={ current >= max }
        >+</Button>
    </div>
}

Counter.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

Counter.defaultProps = {
    min: 1
}

export default Counter;
