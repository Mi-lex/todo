import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
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
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.openOptions = this.openOptions.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.shouldGetEditable = this.shouldGetEditable.bind(this);
        this.cancelOpenOptions = this.cancelOpenOptions.bind(this);
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
                    <textarea
                        defaultValue={this.props.text}
                        ref={this.text}
                        onBlur={this.saveChanges}
                        className={contentClassName}></textarea>
                </Aux>
        } else {
            content = 
                <Aux>
                    <p className={contentClassName}>
                        {this.props.text}
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

    remove() {
        this.props.removeItem(this.props.itemKey);
    }

    edit() {
        this.setState({
            ...this.state,
            showOptions: false,
            isChanging: true
        })
    }

    shouldGetEditable(boolean) {
        this.setState({
            ...this.state,
            isChanging: boolean
        })
    }

    saveChanges(e) {
        const text = e.target.value;

        if (text.length === 0) {
            this.remove();
        } else {
            this.props.saveChanges(this.props.itemKey, text);
            this.shouldGetEditable(false);
        }
    }

    completeTask() {
        this.setState({
            ...this.state,
            completed: !this.state.completed
        })
    }

    toggleOptions() {
        this.setState({
            ...this.state,
            showOptions: !this.state.showOptions
        })
    }

    openOptions() {
        if (!this.state.isChanging) {
            this.__optionsTimer = setTimeout(() => {
                this.toggleOptions(true);
            }, 300);
        }
    }

    cancelOpenOptions() {
        if (this.__optionsTimer) {
            clearTimeout(this.__optionsTimer);
        }
    }

    render() {
        const itemClassNames = this.state.completed ?
            styleExtractor(styles, ['item', 'item--completed']) :
            styles['item'];

        return (
            <li className={itemClassNames}
                onMouseDown={this.openOptions}
                onMouseUp={this.cancelOpenOptions}>
                {this.content}
            </li>
        )
    }

    componentDidMount() {
        if (this.state.isChanging) {
            this.text.current.focus();
        }
    }
}

export default Item;