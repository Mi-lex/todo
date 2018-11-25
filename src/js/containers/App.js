import React, {Component} from 'react';
import Cockpit from '../components/Cockpit/Cockpit';
import List from '../components/List/List';
import styles from './App.module.scss';
import keyGenerator from '../assets/keyGenerator';

const generateKey = keyGenerator();

class App extends Component {
    constructor() {
        super();
        this.state = {
            showOptions: true,
            reverseOrder: false,
            items: [
                {
                    key: generateKey(),
                    text: 'Warm up'
                },
                {
                    key: generateKey(),
                    text: 'Buy groceries'
                }
            ]
        }
    }

    removeAllItems = () => {
        this.setNewItems([]);
    }

    getItemIndex = itemKey =>
        this.state
            .items.findIndex((el) => el.key === itemKey);

    setNewItems = newItemList => {
        this.setState({
            ...this.state,
            items: newItemList
        });
    }

    addItem = text => {
        /**
         * if list of items exist and
         * last task has been recently created
         * do nothing
         */
        if (this.state.items.length && 
            this.state.items[this.state.items.length - 1]
                .text === '') {
            return;
        }

        this.setState({
            ...this.state,
            items: [...this.state.items, {
                key: generateKey(),
                text: text,
                isChanging: true
            }]
        })
    }

    removeItem = itemKey => {
        const newItems = [...this.state.items];
        newItems.splice(this.getItemIndex(itemKey), 1)
        
        this.setNewItems(newItems);
    }

    saveChanges = (key, text) => {
        const newItems = [...this.state.items];
        const editedItem = newItems[this.getItemIndex(key)];
        
        editedItem.text = text;
        
        this.setNewItems(newItems);
    }

    render() {
        return (
            <div className={styles['page-wrapper']}>
                <Cockpit
                    addItem={this.addItem}
                    removeAllItems={this.removeAllItems}>
                </Cockpit>
                <List
                    items={this.state.items}
                    removeItem={this.removeItem}
                    saveChanges={this.saveChanges}/>
            </div>
        )
    }
}

export default App;