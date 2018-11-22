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
    }

    render() {
        return (
            <div className={styles['page-wrapper']}>
                <Cockpit/>
                <List
                    items={this.state.items}
                />
            </div>
        )
    }
}

export default App;