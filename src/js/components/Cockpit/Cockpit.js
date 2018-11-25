import React, {Component} from 'react';
import Options from './Options/Options';
import Button from '../Button/Button';
import styles from './Cockpit.module.scss';
import styleExtractor from '../../assets/styleExtractor';

class Cockpit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false
        }
    }

    toggleOptions = () => {
        this.setState({
            ...this.state,
            showOptions: !this.state.showOptions
        })
    }

    addItem = () => {
        this.props.addItem('');
    }

    get options() {
        return (
            <Options {...this.props}
                toggleOptions={this.toggleOptions}/>
        )
    }

    render() {
        const optionBtnClassName = this.state.showOptions ?
            styleExtractor(styles, 
                ['options-toggler', 'options-toggler--on']) : 
            styles['options-toggler'];

        return (
            <header className={styles['cockpit']}>
                <Button
                    className={optionBtnClassName}
                    spanClass={styles['dot']}
                    purpose='Toggle options'
                    click={this.toggleOptions}/>
                <h1 className={styles['title']}>
                    Todo list
                </h1>
                <Button
                    className={styles['add-item']}
                    purpose='Add item'
                    click={this.addItem}/>
                {this.state.showOptions && this.options}
            </header>
        )
    }
}

export default Cockpit;