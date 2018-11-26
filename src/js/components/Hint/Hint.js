import React from 'react';
import styles from './Hint.module.scss';

const hint = props => (
    <p  tabIndex="0"
        className={styles['hint']}>
        <span className="visually-hidden">
            Toggle hint
        </span>
    </p>
);

export default hint;