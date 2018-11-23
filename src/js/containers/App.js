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
            items: [
                {
                    key: generateKey(),
                    text: 'Write react code'
                },
                {
                    key: generateKey(),
                    text: 'Debug this crap'
                }
            ]
        }

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.setNewItems = this.setNewItems.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.getItemIndex = this.getItemIndex.bind(this);
    }

    getItemIndex(itemKey) {
        return this.state
            .items.findIndex((el) => el.key === itemKey);
    } 
        

    setNewItems(newItemList) {
        this.setState({
            ...this.state,
            items: newItemList
        });
    }

    addItem(text) {
        // if last task has been recently created
        if (this.state.items[this.state.items.length - 1]
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

    removeItem(itemKey) {
        const newItems = [...this.state.items];
        newItems.splice(this.getItemIndex(itemKey), 1)
        
        this.setNewItems(newItems);
    }

    saveChanges(key, text) {
        const newItems = [...this.state.items];
        const editedItem = newItems[this.getItemIndex(key)];
        
        editedItem.text = text;
        
        this.setNewItems(newItems);
    }

    render() {
        return (
            <div className={styles['page-wrapper']}>
                <Cockpit
                    addItem={this.addItem}/>
                <List
                    items={this.state.items}
                    removeItem={this.removeItem}
                    saveChanges={this.saveChanges}/>
            </div>
        )
    }
}

export default App;