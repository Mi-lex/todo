import React from 'react';
import Button from './../../Button';
import classes from './OptionsToggler.module.scss';
import styleExtractor from './../../../utilities/styleExtractor';

const optionToggler = ({showOptions, toggleOptions}) => {
    const togglerClasses = showOptions ?
            styleExtractor(classes, 
                ['options-toggler', 'options-toggler--on']) : 
            classes['options-toggler'];

    return (
        <Button
            className={togglerClasses}
            spanClass={classes['dot']}
            purpose='Toggle options'
            click={toggleOptions}/>
    )
}

export default optionToggler;