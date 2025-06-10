'use client'
import styles from './styles.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { IItem } from '@/types/types'
import ItemImage from '../itemImage/ItemImage'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const Wins = () => {

    const user = useSelector((state: RootState) => state.user)



    return (
        <section className={styles.wins}>
            <h2 className={styles.winsTitle}>Последние выигрыши</h2>

            <Swiper
                className={styles.winsList}
                slidesPerView={4}
                loop={false}>
                {user.inventory ? user.inventory.map((item: IItem, index: number) => {
                    return <SwiperSlide key={index} className={styles.winsListItem}>
                        <ItemImage item={item} />
                    </SwiperSlide>
                }).reverse(): <>no items yet</>}
            </Swiper>

        </section>
    );
}
export default Wins;