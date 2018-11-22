import React, {PureComponent} from 'react';
import Icon from '../../Icon/Icon';
import styles from './Item.module.scss';

class Item extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={styles['item']}>
                <p className={styles['content']}>
                    {this.props.text}
                </p>
                <button className={styles['option'] + ' ' + styles['option--done']}>
                    <span className='visually-hidden'>
                        Completed task
                    </span>
                    <Icon
                        iconName='done'/>
                </button>
            </li>
        )
    }
}

export default Item;