'use client';

import Image from 'next/image';
import styles from './styles.module.css'

import left from './../../sources/images/openCase/left.svg'
import right from './../../sources/images/openCase/right.svg'
import fire from './../../sources/images/mainPage/firelight.svg'



import GridInventory from '../gridInventory/GridInventory';
import { useEffect, useState } from 'react';
import { IItem, IOpnenCase } from '@/types/types';
import Link from 'next/link';
import { getNewId, getRandomItem } from '@/methods/methods';

import 'swiper/css';

import CaseAnimation from '../caseAnimation/CaseAnimation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SFProDisplay from '@/app/fonts';

interface Props {
    boxId: string;
}

const OpenCase: React.FC<Props> = ({ boxId }) => {
    const [data, setData] = useState<IOpnenCase>();
    const [currentCount, setCurrentCount] = useState<number>(1)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [itemsArray, setItemsArray] = useState<IItem[]>([])
    const [winningItem, setWinningItem] = useState<IItem>()

    const [alert, setAlert] = useState<boolean>(false)

    const params = useSelector((state: RootState) => state.params)

    const showAlert = () => {
        setAlert(true);
        setTimeout(() => setAlert(false), 1500)
    }


    useEffect(() => {
        fetch(`/open/api/box/${boxId}`)
            .then(res => res.json())
            .then(data => { setData(data) })
    }, [boxId]);


    const handleOpenCase = () => {

        fetch('/api/open-case', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: `user${params.tgWebAppData?.user?.id}`,
                caseId: boxId,
            }),
        }).then(resp => resp.json()).then(json => { setWinningItem(json.item) })


        fetch(`/open/api/box/${boxId}`)
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
                        />
                        <div className={styles.wrapper}></div>
                    </>
                    :
                    <>
                        <div className={styles.casePicker}>
                            <Link href={`./box${getNewId(boxId, 4, false)}`} className={styles.arrowBtn}><Image src={right} alt='arrow' /></Link>
                            <Image quality={100} unoptimized={true} className={styles.img} width={186} height={186} src={data.img} alt='case' />
                            <Link href={`./box${getNewId(boxId, 4, true)}`} className={styles.arrowBtn}><Image src={left} alt='arrow' /></Link>
                        </div>
                        <div className={`${styles.openBtns}  ${SFProDisplay.bold.className}`}>
                            <div onClick={handleOpenCase} className={styles.btn}>
                                открыть
                                <div className={styles.price}>
                                    {data.price * currentCount}
                                    <Image className={styles.fire} src={fire} alt='fire' />
                                </div>
                            </div>
                            <div onClick={showAlert} className={styles.counts}>
                                <div onClick={() => setCurrentCount(1)} className={`${styles.count1} ${currentCount === 1 ? styles.active : null}`}>x1</div>
                                <div onClick={() => setCurrentCount(2)} className={`${styles.count2} ${currentCount === 2 ? styles.active : null}`}>x2</div>
                                <div onClick={() => setCurrentCount(3)} className={`${styles.count3} ${currentCount === 3 ? styles.active : null}`}>x3</div>
                                {alert ? <div className={styles.alert}>Опция в разработке</div> : null}
                            </div>

                        </div>
                    </>
                }





                <GridInventory array={Object.values(data?.items)} />

            </section>
            : null
    );
}
export default OpenCase;