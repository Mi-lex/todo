import React, {Component} from 'react';
import styles from './Cockpit.module.scss';

class Cockpit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false
        }
    }

    render() {
        return (
            <header className={styles['cockpit']}>
                <button className={styles['options-toggler']}>
                    <span className={styles['dot']}>
                        Toggle options
                    </span>
                </button>
                <h1 className={styles['title']}>
                    Todo list
                </h1>
                <button className={styles['add-item']}>
                    <span className='visually-hidden'>
                        Add Item
                    </span>
                </button>
            </header>
        )
    }
}

export default Cockpit;