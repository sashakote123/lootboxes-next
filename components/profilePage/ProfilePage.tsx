'use client'

import { useEffect, useState } from 'react';
import History from '../history/History';
import Inventory from '../inventory/Inventory';
import UserCard from '../userCard/UserCard';
import styles from './styles.module.css'
import { IUres } from '@/types/types';


const ProfilePage = () => {

    const [data, setData] = useState<IUres>()
    const [data2, setData2] = useState<{userId: string}>()

    useEffect(() => {
        fetch(`/api/users`)
            .then(resp => resp.json())
            .then(json => { setData(json.user1) })


        fetch(`/api/protected`)
            .then(resp => resp.json())
            .then(json => { setData2(json) })
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