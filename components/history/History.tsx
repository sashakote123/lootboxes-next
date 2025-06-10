import Image from 'next/image';
import styles from './styles.module.css'

import img from './../../sources/images/profilePage/clock.svg'
import { IHistoryItem } from '@/types/types';
import ItemImage from '../itemImage/ItemImage';


interface Props {
    historyArray: IHistoryItem[]
}

const History: React.FC<Props> = ({ historyArray }) => {

    const getData = (date: Date): string => {
        const timestamp = new Date(date)
        return `${String(timestamp.getDate()).padStart(2, '0')}:${String(timestamp.getMonth()).padStart(2, '0')}:${String(timestamp.getFullYear()).replace('20', '')}`
    }

    const getTime = (date: Date): string => {
        const timestamp = new Date(date)
        return `${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}`
    }

    return (
        <section className={styles.history}>
            <h2 className={styles.historuTitle}>
                <Image src={img} alt='time' />
                История предметов
            </h2>
            <div className={styles.historyContainer}>
                <ul className={styles.historyList}>
                    {historyArray ? historyArray.map((item: IHistoryItem, index: number) => {
                        return (

                            <li key={index} className={styles.historyItem}>
                                {/* <Image width={64} height={64} src={item.item.image} alt='pict' /> */}
                                <ItemImage item={item.item} />
                                <div className={styles.itemInfo}>
                                    <div className={styles.infoTitle}>{item.item.name}</div>
                                    <div className={styles.dates}>
                                        <div className={styles.date}>{getData(item.timestamp)}</div>
                                        <div className={styles.time}>{getTime(item.timestamp)}</div>
                                    </div>
                                </div>
                                <button className={styles.button}>
                                    +
                                </button>
                            </li>
                        )
                    }).reverse() : <>no items yet</>}
                </ul>
            </div>


        </section>
    );
}
export default History;