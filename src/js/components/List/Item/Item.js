import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
import Textarea from '../../Textarea/Textarea';
import {Aux} from '../../../containers/Hoc'
import styles from './Item.module.scss';
import styleExtractor from '../../../assets/styleExtractor';

class Item extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * When new item is created
             * it has no value therefore
             * it's editable by default
             */
            isChanging: this.props.text.length === 0,
            showOptions: false,
            completed: false
        }

        this.text = React.createRef();
        this.itemContainer = React.createRef();
    }

    get options() {
        const editClassname = 
            styleExtractor(styles, ['option', 'option--edit']);
        const deleteClassName =
            styleExtractor(styles, ['option', 'option--delete']);

        return (
            <div className={styles['options']}>
                <Button
                    className={editClassname}
                    purpose='Edit Task'
                    iconName='edit'
                    click={this.edit}/>
                <Button
                    className={deleteClassName} 
                    purpose='Delete task'
                    iconName='delete'
                    click={this.remove}/>
            </div>
        )
    }

    get content() {
        const completeClassName = 
            styleExtractor(styles, ['option', 'option--done']);

        const contentClassName = styles['content'];

        let content;
        // Use <textarea> instead of <p> whe editing is needed
        if (this.state.isChanging) {
            content = 
                <Aux>
                    <Textarea
                        onBlur={this.saveChanges}
                        defaultValue={this.props.text}
                        className={contentClassName}/>
                </Aux>
        } else {
            content = 
                <Aux>
                    <p className={contentClassName}>
                        {`${this.props.index ? 
                            `${this.props.index}. ` : 
                            ''}${this.props.text}`}
                    </p>
                    <Button
                        className={completeClassName}
                        purpose='Mark task as completed'
                        iconName='done'
                        click={this.completeTask}/>
                    {this.state.showOptions && this.options}
                </Aux>
        }

        return content;
    }

    remove = () => {
        this.props.removeItem(this.props.itemKey);
    }

    edit = () => {
        this.setState({
            ...this.state,
            showOptions: false,
            isChanging: true
        })
    }

    shouldGetEditable = boolean => {
        this.setState({
            ...this.state,
            isChanging: boolean
        })
    }

    saveChanges = e => {
        const text = e.target.value;
        this.fadeBackground(this.itemContainer.current, '#2ECC71');

        if (text.length === 0) {
            this.remove();
        } else {
            this.props.saveChanges(this.props.itemKey, text);
            this.shouldGetEditable(false);
        }
    }

    fadeBackground = (element, hexColor) => {
        element.style.backgroundColor = hexColor;
        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 150);
    }

    completeTask = () => {
        this.setState({
            ...this.state,
            completed: !this.state.completed
        })
    }

    toggleOptions = () => {
        this.setState({
            ...this.state,
            showOptions: !this.state.showOptions
        })
    }

    openOptions = () => {
        if (!this.state.isChanging) {
            this.__optionsTimer = setTimeout(() => {
                this.toggleOptions(true);
            }, 300);
        }
    }

    cancelOpenOptions = () => {
        if (this.__optionsTimer) {
            clearTimeout(this.__optionsTimer);
        }
    }

    render() {
        const itemClassNames = this.state.completed ?
            styleExtractor(styles, ['item', 'item--completed']) :
            styles['item'];

        return (
            <li ref={this.itemContainer}
                className={itemClassNames}
                onMouseDown={this.openOptions}
                onMouseUp={this.cancelOpenOptions}>
                {this.content}
            </li>
        )
    }
}

export default Item;