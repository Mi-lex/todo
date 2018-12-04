import React from 'react';
import classes from './Icon.module.scss';

const icon = ({iconName}) => (
    <svg className={classes['icon']}>
        <use xlinkHref={`./img/sprite.svg#${iconName}`}></use>
    </svg>
);

export default icon;