/**
 * Function for concatinating several classNames from style obj
 * @param {Object}  styles       Obj imported when css/sass styles are used
 * @param {Array}   classNames   Css names that need to be applied
 * @return {String}
 */

const styleExtractor = (styles, classNames) => 
    classNames.map(name => styles[name])
        .join(' ');


export default styleExtractor;
