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
import { updateParams } from '@/store/launchParamsSlice';
import { ILaunchParams } from '@/types/types';
import SFProDisplay from '@/app/fonts';

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const params = useSelector((state: RootState) => state.params)
    useEffect(() => {

        if (!params.tgWebAppData.user.id) {
            const launchParams = isTMA() ? retrieveLaunchParams() : mockLaunchParams

            dispatch(updateParams(launchParams as ILaunchParams))

            fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userData: launchParams.tgWebAppData?.user,
                })
            })
                .then(resp => resp.json())
                .then(json => {
                    dispatch(updateCoins(json.item.coins));
                    if (json.item.inventory) {
                        dispatch(updateInventory(json.item.inventory))
                        dispatch(updateHistory(json.item.history))
                    }
                })
        }

    }, [dispatch, params.tgWebAppData.user.id])


    return (
        user.coins !== -1 ?
            <header className={`${styles.header} ${SFProDisplay.semibold.className}`}>
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