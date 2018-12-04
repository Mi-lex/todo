import React, {Component} from 'react';
import classes from './Options.module.scss';

class Options extends Component {
    get list() {
        return this.props.options.map( option => (
            <li key={option.purpose}
                className={classes['options-container']}>
                <button
                    onClick={option.action}
                    className={classes['option']}>
                    {option.purpose}
                </button>
            </li>
        ));
    }

    render() {
        return (
            <ul className={classes['options']}
                onClick={this.props.toggleOptions}>
                {this.list}
            </ul>
        )
    }
}

export default Options;