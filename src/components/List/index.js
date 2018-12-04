import React, {Component} from 'react';
import Item from './Item';
import classes from './List.module.scss'

class List extends Component {
    get items() {
        return this.props.items.map(item => 
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

    render() {
        return (
            <section>
                <ul className={classes['list']}>
                    {this.items}
                </ul>
            </section>
        )
    }
}

export default List;