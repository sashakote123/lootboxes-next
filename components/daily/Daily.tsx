'use client'

import styles from './styles.module.css'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react'
import DailyItem from '../dailyItem/DailyItem'
import { IDailies } from '@/types/types'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';




const Daily = () => {
    const [events, setEvents] = useState<IDailies[]>()
    const userId = useSelector((store: RootState) => store.params.tgWebAppData.user.id)

    useEffect(() => {

        fetch(`/api/events/daily/usertasks/user${userId}`)
            .then(resp => resp.json())
            .then(json => {setEvents(Object.values(json)) })
    }, [userId])


    return (
        <section className={styles.daily}>
            <Swiper
                slidesPerView={2}
                spaceBetween={12}
                loop={false}>
                {events ? events.map((item: IDailies, index: number) => {
                    return (
                        <SwiperSlide key={index} >
                            <DailyItem item={item} index={index} />
                        </SwiperSlide>

                    )
                }) : <div>loading...</div>}
            </Swiper>



        </section>
    );
}
export default Daily;