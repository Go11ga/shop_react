import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { routesMap } from '@/router';

import userSettings from '@/contexts/userSettings';

import styles from './styles.module.css';

export default function(){
    let { theme } = useContext(userSettings);

    return <div className={theme === 'light' ? styles.theme__light + " pb-2 mb-4" : styles.theme__dark + " pb-2 mb-4"}>
        <h2>Page not found</h2>
        <div className="alert alert-warning">
            Start from <Link to={routesMap.products}>main page</Link>
        </div>
    </div>
};
