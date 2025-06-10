'use client'

import { useEffect, useState } from 'react';
import History from '../history/History';
import Inventory from '../inventory/Inventory';
import UserCard from '../userCard/UserCard';
import styles from './styles.module.css'
import { IUres } from '@/types/types';
import { isTMA, retrieveLaunchParams, retrieveRawInitData } from '@telegram-apps/sdk';


const ProfilePage = () => {

    const [data, setData] = useState<IUres>()
    const [data2, setData2] = useState<{ userId: string }>()

    useEffect(() => {
        fetch(`/api/users`)
            .then(resp => resp.json())
            .then(json => { setData(json.user1) })

        if (isTMA()) {
            const initDataRaw = retrieveRawInitData();
            const launchParams = retrieveLaunchParams()
            console.log(initDataRaw);
            console.log(launchParams);
            fetch('/api/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `tma ${initDataRaw}`
                }
            })
                .then(resp => resp.json())
                .then(json => { setData2(json) })
        }
    }, [])



    return (
        data ?
            <section className={styles.profilePage}>
                {data2 ? <div>{data2.userId}</div> : null}
                <UserCard name={data.name} id={data.id} />
                <History historyArray={data?.history} />
                <Inventory array={data?.inventory} />
            </section>
            : null
    );
}
export default ProfilePage;