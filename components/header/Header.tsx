'use client'

import Image from 'next/image';
import styles from './styles.module.css'

import fire from './../../sources/images/mainPage/firelight.svg'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IUres } from '@/types/types';

const Header = () => {
    const [data, setData] = useState<IUres>()

    useEffect(() => {
        fetch(`/api/users`)
            .then(resp => resp.json())
            .then(json => { setData(json.user1) })
    }, [])


    return (
        data ?
            <header className={styles.header}>
                <Link href='/coins' className={styles.coins}>
                    <Image src={fire} alt='fire' />
                    <div className={styles.text}>{data?.coins}</div>
                </Link>

                <Link href='/profile' className={styles.inventory}>
                    <div className={styles.text}>Инвентарь</div>
                    <div className={styles.inventoryValue}>({data.inventory.length})</div>
                </Link>
            </header> : null
    );
}
export default Header;