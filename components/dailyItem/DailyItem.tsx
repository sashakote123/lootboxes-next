'use client'

import styles from './styles.module.css'
import Image from 'next/image';
import fire from './../../sources/images/mainPage/firelight.svg'
import { IDailies } from '@/types/types';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';


interface Props {
    item: IDailies
    index: number
}

const getDate = (date: number): string => {
    const secondsLeft = Math.max(0, Math.floor((date - Date.now()) / 1000));
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    return `${hours}:${minutes}:${seconds}`;
}

const DailyItem: React.FC<Props> = ({ item, index }) => {
    const [timeLeft, setTimeLeft] = useState(() => getDate(new Date(item.timer || 1000000).getTime()));
    const [complete, setComplete] = useState<boolean>(item.isComplete || false);
    const timerRef = useRef<Date>(new Date(item.timer || 1000000));
    const hasExpiredRef = useRef<boolean>(false);

    const userId = useSelector((store: RootState) => store.params.tgWebAppData.user.id)

    const router = useRouter()


    useEffect(() => {
        const checkExpiration = async () => {
            if (Date.now() >= timerRef.current.getTime() && complete && !hasExpiredRef.current) {
                try {
                    const response = await fetch(`/api/events/daily/usertasks/user${userId}/uncomplete/event${index + 1}`, { method: 'POST' });
                    const json = await response.json();
                    setComplete(json.item.isComplete);
                    timerRef.current = new Date(json.item.timer);
                    hasExpiredRef.current = true;
                } catch (error) {
                    console.error('Error uncompleting task:', error);
                }
            }
        };

        const interval = setInterval(() => {
            setTimeLeft(getDate(timerRef.current.getTime()));
            checkExpiration();
        }, 1000);

        return () => clearInterval(interval);
    }, [complete, index, userId]);

    const completeTask = async (taskId: number) => {
        try {
            const response = await fetch(`/api/events/daily/usertasks/user${userId}/complete/event${taskId}`, { method: 'POST' });
            const json = await response.json();
            setComplete(json.item.isComplete);
            setTimeLeft('--:--:--');
            timerRef.current = new Date(json.item.timer);
            hasExpiredRef.current = false;

            switch (item.type) {
                case 'getReward':
                    fetch(`${item.action}user${userId}`, { method: 'POST' })
                        .then(resp => resp.json())
                        .then(json => console.log(json))
                    break;

                case 'watchVideo':
                    console.log('video');
                    break;

                case 'openBox':
                    router.push('/open/bonusbox')
                    break;
            }


        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div className={styles.item}>
            <Image width={200} height={200} className={styles.sliderImage} priority={false} src={item.image} alt='img' />
            <h4 className={styles.itemTitle}>{item.name}</h4>
            <div className={styles.itemDesc}>{item.description}</div>
            {complete ? (
                <button className={styles.itemBtn}>{timeLeft}</button>
            ) : (
                <button onClick={() => completeTask(index + 1)} className={styles.itemBtnReward}>
                    <div>+ {item.reward}</div>
                    <Image src={fire} alt='reward' />
                </button>
            )}
        </div>
    );
}

export default DailyItem;