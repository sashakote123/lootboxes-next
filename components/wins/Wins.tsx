'use client'
import styles from './styles.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react'
import { IItem, IUres } from '@/types/types'
import ItemImage from '../itemImage/ItemImage'


const Wins = () => {

    const [data, setData] = useState<IUres>()

    useEffect(() => {
        fetch(`/api/users`)
            .then(resp => resp.json())
            .then(json => { setData(json.user1) })
    }, [])


    return (
        <section className={styles.wins}>
            <h2 className={styles.winsTitle}>Последние выигрыши</h2>

            <Swiper
                className={styles.winsList}
                slidesPerView={4}
                loop={false}>
                {data?.inventory.map((item: IItem, index: number) => {
                    return <SwiperSlide key={index} className={styles.winsListItem}>
                        <ItemImage item={item}/>
                    </SwiperSlide>
                })}
            </Swiper>

        </section>
    );
}
export default Wins;