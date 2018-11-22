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
            <header className={styles.cockpit}>
                <button className="cockpit__options-toggler">
                    <span className="dot">
                        Toggle options
                    </span>
                </button>
                <h1 className="cockpit__title">
                    Todo list
                </h1>
                <button className="cockpit__add-item">
                    <span className="visually-hidden">Add Item</span>
                </button>
            </header>
        )
    }
}