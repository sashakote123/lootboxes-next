'use client'

import styles from './styles.module.css'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react'
import DailyItem from '../dailyItem/DailyItem'
import { IDailies } from '@/types/types'




const Daily = () => {
    const [events, setEvents] = useState<IDailies[]>()


    useEffect(() => {
        // fetch('/api/events/daily/usertasks/user12345678/complete/event1')


        fetch('/api/events/daily/usertasks/user12345678')
            .then(resp => resp.json())
            .then(json => { console.log(json); setEvents(Object.values(json)) })
    }, [])


    return (
        <section className={styles.daily}>
            <Swiper
                slidesPerView={2}
                spaceBetween={12}
                loop={false}>
                {events ? events.map((item: IDailies, index: number) => {
                    return (
                        <SwiperSlide key={index} >
                            <DailyItem  item={item} index={index} />
                        </SwiperSlide>

                    )
                }) : <div>loading...</div>}
            </Swiper>



        </section>
    );
}
export default Daily;