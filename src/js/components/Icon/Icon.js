import React from 'react';
import styles from './Icon.module.scss';

const icon = props => (
    <svg className={styles['icon']}>
        <use xlinkHref={`./img/sprite.svg#${props.iconName}`}></use>
    </svg>
);

export default icon;