import React, {Component} from 'react';
import Item from './Item/Item';
import styles from './List.module.scss'

class List extends Component {
    get itemList() {
        if (!this.__itemList ||
            this.__itemList !== this.props.items) {

            this.__itemList = this.props.items;

            this.__itemComponentList = this.props.items.map((item, index) => 
                <Item
                    // Pass all item properties into component props
                    {...item}
                    /**
                     * Dublicate passing key,
                     * so it's possible to use it
                     */
                    itemKey={item.key}
                    removeItem={this.props.removeItem}
                    saveChanges={this.props.saveChanges}>
                </Item>
            );
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