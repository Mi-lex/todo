import React, {PureComponent} from 'react';
import Button from '../../Button/Button';
import {Aux} from '../../../containers/Hoc'
import styles from './Item.module.scss';
import styleExtractor from '../../../assets/styleExtractor';

class Item extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showOptions: false,
            isChanging: this.props.text.length === 0,
            completed: false
        }

        this.text = React.createRef();
        this.removeSelf = this.removeSelf.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.completeTask = this.completeTask.bind(this);
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
                    iconName='edit'/>
                <Button
                    className={deleteClassName} 
                    purpose='Delete task'
                    iconName='delete'
                    onClick={this.removeSelf}/>
            </div>
        )
    }

    get content() {
        const completeClassName = 
            styleExtractor(styles, ['option', 'option--done']);

        const contentClassName = styles['content'];

        let content;
        /**
         * Use textarea for content depending on whether item is
         * getting edited or not
         */
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

    removeSelf() {
        this.props.removeItem(this.props.itemKey);
    }

    toggleChangingMod() {
        this.setState({
            ...this.state,
            isChanging: !this.state.isChanging
        })
    }

    saveChanges(e) {
        const text = e.target.value;

        if (text.length === 0) {
            this.removeSelf();
        } else {
            this.props.saveChanges(this.props.itemKey, text);
            this.toggleChangingMod();
        }
    }

    completeTask() {
        this.setState({
            ...this.state,
            completed: !this.state.completed
        })
    }

    render() {
        const itemClassNames = this.state.completed ?
            styleExtractor(styles, ['item', 'item--completed']) :
            styles['item'];

        return (
            <li className={itemClassNames}>
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