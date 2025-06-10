'use client'

import { useEffect, useState } from 'react';
import History from '../history/History';
import Inventory from '../inventory/Inventory';
import UserCard from '../userCard/UserCard';
import styles from './styles.module.css'
import { IUres } from '@/types/types';
import { isTMA, retrieveLaunchParams } from '@telegram-apps/sdk';
import { mockLaunchParams } from '@/mock/launchParams';


const ProfilePage = () => {

    const [data, setData] = useState<IUres>()

    useEffect(() => {
        const launchParams = isTMA() ? retrieveLaunchParams() : mockLaunchParams

        // fetch('/api/profile', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userData: launchParams.tgWebAppData?.user,
        //     })
        // })


        fetch(`/api/users/user${launchParams.tgWebAppData?.user?.id}`)
            .then(resp => resp.json())
            .then(json => { setData(json); console.log(json) })

    }, [])




    return (
        data ?
            <section className={styles.profilePage}>
                <UserCard name={`${data.name} ${data.lastname}`} id={data.id} />
                <History historyArray={data?.history} />
                <Inventory array={data?.inventory} />
            </section>
            : null
    );
}
export default ProfilePage;