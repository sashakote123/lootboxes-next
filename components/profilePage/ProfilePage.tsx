'use client'

import { useEffect, useState } from 'react';
import History from '../history/History';
import Inventory from '../inventory/Inventory';
import UserCard from '../userCard/UserCard';
import styles from './styles.module.css'
import { IUres } from '@/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const ProfilePage = () => {

    const [data, setData] = useState<IUres>()
    const params = useSelector((state: RootState) => state.params)
    useEffect(() => {

        fetch(`/api/user/user${params.tgWebAppData?.user?.id}`)
            .then(resp => resp.json())
            .then(json => { setData(json) })

    }, [params.tgWebAppData?.user?.id])




    return (
        data ?
            <section className={styles.profilePage}>
                <UserCard name={`${data.name} ${data?.lastname}`} id={data.id} />
                <History historyArray={data?.history} />
                <Inventory array={data?.inventory} />
            </section>
            : null
    );
}
export default ProfilePage;