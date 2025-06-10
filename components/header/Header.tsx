'use client'

import Image from 'next/image';
import styles from './styles.module.css'

import fire from './../../sources/images/mainPage/firelight.svg'
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCoins, updateHistory, updateInventory } from '@/store/userSlice';
import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk';
import { mockLaunchParams } from '@/mock/launchParams';

const Header = () => {
    //const [data, setData] = useState<IUres>()

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        const launchParams = isTMA() ? retrieveLaunchParams() : mockLaunchParams
        if (user.coins === -1)
            fetch(`/api/users/user${launchParams.tgWebAppData?.user?.id}`)
                .then(resp => resp.json())
                .then(json => {
                    dispatch(updateCoins(json.coins));
                    if (json.inventory) {
                        dispatch(updateInventory(json?.inventory))
                        dispatch(updateHistory(json?.history))
                    }
                })
    }, [dispatch, user.coins])


    return (
        user.coins !== -1 ?
            <header className={styles.header}>
                <Link href='/coins' className={styles.coins}>
                    <Image src={fire} alt='fire' />
                    <div className={styles.text}>{user.coins}</div>
                </Link>

                <Link href='/profile' className={styles.inventory}>
                    <div className={styles.text}>Инвентарь</div>
                    <div className={styles.inventoryValue}>({user.inventory.length})</div>
                </Link>
            </header> :
            null
    );
}
export default Header;