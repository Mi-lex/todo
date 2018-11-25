import React, {Component} from 'react';
import styles from './Options.module.scss';

class Options extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className={styles['options']}
                onClick={this.props.toggleOptions}>
                <li className={styles['options-container']}>
                    <button
                        onClick={this.props.removeAllItems} 
                        className={styles['option']}>
                        Remove all tasks
                    </button>
                </li>
                <li className={styles['options-container']}>
                    <button
                        onClick={this.props.changeOrder}
                        className={styles['option']}>
                        Change order
                    </button>
                </li>
            </ul> 
        )
    }
}

    export default Options;