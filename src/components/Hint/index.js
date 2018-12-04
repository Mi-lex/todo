import React from 'react';
import classes from './Hint.module.scss';

const hint = () => (
    <p  tabIndex="0"
        className={classes['hint']}>
        <span className="visually-hidden">
            Toggle hint
        </span>
    </p>
);

export default hint;