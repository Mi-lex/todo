import React, {Component} from 'react';
import Button from '../Button/Button';
import styles from './Cockpit.module.scss';

class Cockpit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false
        }
        this.addItem = this.addItem.bind(this);
    }

    addItem() {
        this.props.addItem('');
    }

    render() {
        return (
            <header className={styles['cockpit']}>
                <Button
                    className={styles['options-toggler']}
                    spanClass={styles['dot']}
                    purpose='Toggle options'/>
                <h1 className={styles['title']}>
                    Todo list
                </h1>
                <Button
                    className={styles['add-item']}
                    purpose='Add item'
                    click={this.addItem}/>
            </header>
        )
    }
}

export default Cockpit;