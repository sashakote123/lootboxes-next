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

const Header = () => {
    //const [data, setData] = useState<IUres>()

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const params = useSelector((state: RootState) => state.params)
    useEffect(() => {

        console.log('useeffect');
        if (!params.tgWebAppData.user.id) {
            console.log('get params');
            //const launchParams = isTMA() ? retrieveLaunchParams() : mockLaunchParams
            const launchParams = mockLaunchParams
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
        }




    }, [dispatch, params.tgWebAppData.user.id, user.coins])


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