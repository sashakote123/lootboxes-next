import Image from 'next/image';
import styles from './styles.module.css'
import img from './../../sources/images/profilePage/inventory.svg'
import GridInventory from '../gridInventory/GridInventory';
import { IItem } from '@/types/types';



interface Props {
    array: IItem[],
}

const Inventory: React.FC<Props> = ({ array }) => {



    return (
        <section className={styles.inventory}>
            <h2 className={styles.inventoryTitle}>
                <Image src={img} alt='inv' />
                Инвентарь
            </h2>

            <GridInventory array={array} />
        </section>
    );
}
export default Inventory;