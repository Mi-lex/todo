import React, {Component} from 'react';
import Options from './Options';
import OptionsToggler from './OptionsToggler';
import Button from '../Button';
import classes from './Cockpit.module.scss';

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
        return (
            <header className={classes['cockpit']}>
                <OptionsToggler 
                    showOptions={this.state.showOptions}
                    toggleOptions={this.toggleOptions}/>
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