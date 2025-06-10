'use client'

import Image from 'next/image';
import styles from './styles.module.css'

import fire from './../../sources/images/mainPage/firelight.svg'
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCoins, updateHistory, updateInventory } from '@/store/userSlice';
// import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk';
import { mockLaunchParams } from '@/mock/launchParams';
import { updateParams } from '@/store/launchParamsSlice';
import { ILaunchParams } from '@/types/types';

const Header = () => {
    //const [data, setData] = useState<IUres>()

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const params = useSelector((state: RootState) => state.params)
    useEffect(() => {
        if (!params.tgWebAppData.user.id) {
            const launchParams = mockLaunchParams;
            dispatch(updateParams(launchParams as ILaunchParams));

            // Добавьте проверку, чтобы не делать запрос при каждом изменении coins
            if (user.coins === -1) {
                fetch('/api/profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userData: launchParams.tgWebAppData?.user })
                })
                    .then(resp => resp.json())
                    .then(json => {
                        dispatch(updateCoins(json.item.coins));
                        if (json.item.inventory) {
                            dispatch(updateInventory(json.item.inventory));
                            dispatch(updateHistory(json.item.history));
                        }
                    });
            }
        }
    }, []);

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