'use client'

import { useEffect, useState } from 'react';
import History from '../history/History';
import Inventory from '../inventory/Inventory';
import UserCard from '../userCard/UserCard';
import styles from './styles.module.css'
import { IUres } from '@/types/types';

const ProfilePage = () => {

    const [data, setData] = useState<IUres>()


    useEffect(() => {
        fetch(`/api/users`)
            .then(resp => resp.json())
            .then(json => { setData(json.user1) })
    }, [])



    return (
        data ?
            <section className={styles.profilePage}>
                <UserCard name={data.name} id={data.id} />
                <History historyArray={data?.history} />
                <Inventory array={data?.inventory} />
            </section>
            : null
    );
}
export default ProfilePage;