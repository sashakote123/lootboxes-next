'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.css'
import Image, { StaticImageData } from 'next/image';
import 'swiper/css';


import fire from './../../sources/images/mainPage/firedark.svg'
import Link from 'next/link';

interface ICases {
    id: number
    img: StaticImageData,
    name: string,
    price: number,
}

interface Props {
    casesArray: ICases[]
}

const CasesBlock: React.FC<Props> = ({ casesArray }) => {
    return (
        <Swiper
            className={styles.winsList}
            slidesPerView={2}
            spaceBetween={12}
            loop={false}>
            {casesArray.map((item: ICases, index: number) => {
                return <SwiperSlide key={index} className={styles.winsListItem}>
                    <div className={styles.image}>
                        <Image priority={false} width={120} height={120} src={item.img} alt='img' />
                    </div>
                    <div className={styles.bottom}>
                        <h3 className={styles.title}>{item.name}</h3>
                        <Link href={`open/box${item.id}`} className={styles.openBtn}>
                            {item.price}
                            <Image src={fire} alt='fire' />
                        </Link>
                    </div>

                </SwiperSlide>
            })}
        </Swiper>
    );
}
export default CasesBlock;