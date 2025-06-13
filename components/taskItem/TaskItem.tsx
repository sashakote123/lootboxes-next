import Image from 'next/image';
import styles from './styles.module.css'
import { ITasks } from '@/types/types';

import arrow from './../../sources/images/mainPage/arrowDark.svg'
import ok from './../../sources/images/mainPage/okdark.svg'

import fire from './../../sources/images/mainPage/fireblue.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { updateCoins } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

interface Props {
    item: ITasks,
    index: number
}

const TaskItem: React.FC<Props> = ({ item, index }) => {
    const userId = useSelector((store: RootState) => store.params.tgWebAppData.user.id)
    const [complete, setComplete] = useState<boolean>(item.isComplete)
    const dispatch = useDispatch()
    const router = useRouter()

    const checkSubscribe = async () => {


        const resp = await fetch(`/api/actions/check-sub/event${index + 1}/${userId}`);
        const json = await resp.json()

        if (json.item.ok) {
            const resp = await fetch(`/api/events/tasks/usertasks/user${userId}/complete/event${index + 1}`, { method: 'POST' })
            const json = await resp.json()

            setComplete(json.item.isComplete)
            dispatch(updateCoins(json.item.coins))

        } else {
            router.push('https://t.me/lootboxes_test')
        }

    }


    return (
        <li className={styles.task}>
            <div className={styles.taskImage}>
                <Image width={21} height={21} src={item.img} alt='image' />
            </div>
            <div className={styles.taskInfo}>
                <div className={styles.infoTitle}>{item.title}</div>
                <div className={styles.infoReward}>
                    +{item.reward}
                    <Image src={fire} alt='image' />
                </div>
            </div>
            {complete ? <div className={styles.completed}>
                <Image src={ok} alt='image' />
            </div> :
                <button onClick={checkSubscribe} className={styles.completeBtn}>
                    <Image src={arrow} alt='image' />
                </button>}


        </li>
    );
}
export default TaskItem;