import React, {Component} from 'react';
import Item from './Item/Item';
import styles from './List.module.scss'

class List extends Component {
    get itemList() {
        if (!this.__itemList ||
            this.__itemList !== this.props.items) {

            this.__itemList = this.props.items;
            this.__itemComponentList = this.props.items.map(item => 
                <Item
                    key={item.key}
                    itemKey={item.key}
                    text={item.text}/>
            ).reverse();
        }

        return this.__itemComponentList;
    }

    render() {
        return (
            <section>
                <ul className={styles['list']}>
                    {this.itemList}
                </ul>
            </section>
        )
    }
}

export default List;