'use client';

import Image from 'next/image';
import styles from './styles.module.css'

import fire from './../../sources/images/mainPage/firelight.svg'



import GridInventory from '../gridInventory/GridInventory';
import { useEffect, useState } from 'react';
import { IItem, IOpnenCase } from '@/types/types';
import { getRandomItem } from '@/methods/methods';

import 'swiper/css';

import CaseAnimation from '../caseAnimation/CaseAnimation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';



const OpenBonusCase = () => {
    const [data, setData] = useState<IOpnenCase>();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemsArray, setItemsArray] = useState<IItem[]>([])
    const [winningItem, setWinningItem] = useState<IItem>()


    const params = useSelector((state: RootState) => state.params)
    const router = useRouter()



    useEffect(() => {
        fetch(`/open/api/box/bonusbox`)
            .then(res => res.json())
            .then(data => { setData(data) })
    }, []);


    const handleOpenCase = () => {

        fetch('/api/open-case', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: `user${params.tgWebAppData?.user?.id}`,
                caseId: 'bonusbox',
            }),
        }).then(resp => resp.json()).then(json => { setWinningItem(json.item) })


        fetch(`/open/api/box/bonusbox`)
            .then(resp => resp.json())
            .then(json => {
                const resArr = []
                for (let i = 0; i < 100; i++) resArr.push(getRandomItem(Object.values(json.items)))
                setItemsArray(resArr)
            })
    }

    useEffect(() => {
        const resArray = itemsArray;
        if (winningItem) {
            resArray[95] = winningItem
            setItemsArray(resArray)
            setIsOpen(true)
        }

    }, [winningItem, itemsArray])

    return (

        data ?
            <section className={styles.openCase}>
                {isOpen && winningItem && itemsArray ?
                    <>
                        <CaseAnimation
                            itemsArray={itemsArray}
                            setIsOpen={setIsOpen}
                            onTransitionEnd={() => router.push('/')}
                        />
                        <div className={styles.wrapper}></div>
                    </>
                    :
                    <>
                        <div className={styles.casePicker}>
                            <Image quality={100} unoptimized={true} className={styles.img} width={186} height={186} src={data.img} alt='case' />
                        </div>
                        <div className={styles.openBtns}>
                            <div onClick={handleOpenCase} className={styles.btn}>
                                открыть
                                <div className={styles.price}>
                                    {data.price}
                                    <Image className={styles.fire} src={fire} alt='fire' />
                                </div>
                            </div>

                        </div>
                    </>
                }





                <GridInventory array={Object.values(data?.items)} />

            </section>
            : null
    );
}
export default OpenBonusCase;