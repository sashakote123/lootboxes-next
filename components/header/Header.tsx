'use client'

import Image from 'next/image';
import styles from './styles.module.css'

import fire from './../../sources/images/mainPage/firelight.svg'
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCoins, updateHistory, updateInventory } from '@/store/userSlice';

const Header = () => {
    //const [data, setData] = useState<IUres>()

    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (user.coins === -1)
            fetch(`/api/users`)
                .then(resp => resp.json())
                .then(json => {
                    dispatch(updateCoins(json.user1.coins));
                    dispatch(updateInventory(json.user1.inventory))
                    dispatch(updateHistory(json.user1.history))
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