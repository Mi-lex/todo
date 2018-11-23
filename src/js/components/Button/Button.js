import React from 'react';
import Icon from '../Icon/Icon';

const button = (props) => {
    const {className, spanClass, purpose, iconName, click} = props;
    return (
        <button className={className} onClick={click}>
            <span className={spanClass || "visually-hidden"}>
                {purpose}
            </span>
            {(iconName) && 
            <Icon
                iconName={iconName}/>}
        </button>
    )
}

export default button;