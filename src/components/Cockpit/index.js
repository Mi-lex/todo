import React, {Component} from 'react';
import Options from './Options';
import Button from '../Button';
import classes from './Cockpit.module.scss';
import styleExtractor from '../../utilities/styleExtractor';

class Cockpit extends Component {
    state = {
        showOptions: false
    }

    toggleOptions = () => {
        this.setState({
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
            styleExtractor(classes, 
                ['options-toggler', 'options-toggler--on']) : 
            classes['options-toggler'];

        return (
            <header className={classes['cockpit']}>
                <Button
                    className={optionBtnClassName}
                    spanClass={classes['dot']}
                    purpose='Toggle options'
                    click={this.toggleOptions}/>
                <h1 className={classes['title']}>
                    Todo list
                </h1>
                <Button
                    className={classes['add-item']}
                    purpose='Add item'
                    click={this.addItem}/>
                {this.state.showOptions && this.options}
            </header>
        )
    }
}

export default Cockpit;