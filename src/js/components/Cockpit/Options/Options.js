import React, {Component} from 'react';
import styles from './Options.module.scss';

class Options extends Component {
    get list() {
        return this.props.options.map( option => (
            <li key={option.purpose}
                className={styles['options-container']}>
                <button
                    onClick={option.action}
                    className={styles['option']}>
                    {option.purpose}
                </button>
            </li>
        ));
    }

    render() {
        return (
            <ul className={styles['options']}
                onClick={this.props.toggleOptions}>
                {this.list}
            </ul>
        )
    }
}

    export default Options;