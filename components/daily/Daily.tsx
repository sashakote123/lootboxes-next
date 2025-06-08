'use client'

import styles from './styles.module.css'

import img1 from './../../sources/images/mainPage/daily1.png'
import img2 from './../../sources/images/mainPage/daily2.png'
import fire from './../../sources/images/mainPage/firelight.svg'


import Image, { StaticImageData } from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface IDailies {
    img: StaticImageData,
    title: string,
    desc: string,

    isComplete: boolean,
    reward: number,
    timer: string
}

const dailies: IDailies[] = [
    {
        img: img1,
        title: 'Ежедневный кейс',
        desc: 'Бесплатный выйгрыш каждый день',
        isComplete: true,
        reward: 200,
        timer: '05.21.15'
    },
    {
        img: img2,
        title: 'Ежедневный кейс',
        desc: 'Бесплатный выйгрыш каждый день',
        isComplete: false,
        reward: 100,
        timer: '05.21.15'
    },
    {
        img: img1,
        title: 'Ежедневный кейс',
        desc: 'Бесплатный выйгрыш каждый день',
        isComplete: true,
        reward: 200,
        timer: '05.21.15'
    },
    {
        img: img2,
        title: 'Ежедневный кейс',
        desc: 'Бесплатный выйгрыш каждый день',
        isComplete: false,
        reward: 3000,
        timer: '05.21.15'
    },
    {
        img: img1,
        title: 'Ежедневный кейс',
        desc: 'Бесплатный выйгрыш каждый день',
        isComplete: true,
        reward: 150,
        timer: '05.21.15'
    },
]

const Daily = () => {

    return (
        <section className={styles.daily}>
            <Swiper
                slidesPerView={2}
                spaceBetween={12}
                loop={false}>
                {dailies.map((item: IDailies, index: number) => {
                    return (
                        <SwiperSlide key={index} className={styles.item}>
                            <Image priority={false} src={item.img} alt='img' />
                            <h4 className={styles.itemTitle}>{item.title}</h4>
                            <div className={styles.itemDesc}>{item.desc}</div>
                            {item.isComplete ? <button className={styles.itemBtn}>{item.timer}</button> :
                                <button className={styles.itemBtnReward}>
                                    <div>+ {item.reward}</div>

                                    <Image src={fire} alt='reward' />
                                </button>}
                        </SwiperSlide>
                    )
                })}
            </Swiper>



        </section>
    );
}
export default Daily;