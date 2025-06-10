import styles from './styles.module.css'

import { Dispatch, SetStateAction, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import ItemImage from '../itemImage/ItemImage';
import { IItem } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoins, updateInventory } from '@/store/userSlice';
import { RootState } from '@/store/store';

interface Props {
    itemsArray: IItem[],
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}

const CaseAnimation = ({ itemsArray, setIsOpen }: Props) => {
    const dispatch = useDispatch()
    const swiperRef = useRef<SwiperType | null>(null);

    const params = useSelector((state: RootState) => state.params)

    const onSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper
        if (swiperRef.current) {
            const swiper = swiperRef.current;
            swiper.slideTo(95, 5000, true);

        }
    }

    const tranSitionEnd = () => {
        fetch(`/api/user/user${params.tgWebAppData?.user?.id}`)
            .then(resp => resp.json())
            .then(json => {
                dispatch(updateCoins(json.coins))
                dispatch(updateInventory(json.inventory))
            })
        setTimeout(() => setIsOpen(false), 1500)
    }

    return (
        <section className={styles.animation}>
            <div className={styles.wrapper}></div>
            <Swiper className={styles.slider}
                slideActiveClass="activeClass"
                allowTouchMove={false}
                centeredSlides
                spaceBetween={10}
                onSwiper={(swiper) => onSwiper(swiper)}
                onSlideChangeTransitionEnd={tranSitionEnd}
                initialSlide={0}
                slidesPerView={5}>
                {itemsArray.map((item: IItem, index: number) => {
                    return <SwiperSlide className={styles.openSlide} key={index}><ItemImage width={96} height={96} item={item} /></SwiperSlide>
                })}
            </Swiper>
        </section>

    );
};
export default CaseAnimation;