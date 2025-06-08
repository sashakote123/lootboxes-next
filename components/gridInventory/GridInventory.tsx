import styles from './styles.module.css'
import { IItem } from '@/types/types';

import ItemImage from '../itemImage/ItemImage';

interface Props {
    array: IItem[],
}


const GridInventory: React.FC<Props> = ({ array }) => {
    return (
        <ul className={styles.inventoryGrid}>
            {array.map((item: IItem, index: number) => {
                return (<li key={index} className={styles.gridItem}>
                    <ItemImage item={item}/>
                </li>)
            })}
        </ul>
    );
}
export default GridInventory;