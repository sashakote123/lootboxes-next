'use client';

import { useEffect, useState } from 'react';
import CasesBlock from '../casesBlock/CasesBlock';
import Partners from '../partners/Partners';
import styles from './styles.module.css'

const CasesPage = () => {
const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/lootboxes')
            .then(res => res.json())
            .then(data => { setData(Object.values(data))})
    }, []);

    return (
        <section className={styles.casesPage}>
            <h2 className={styles.title}>Кейсы</h2>
            <h3 className={styles.subtitle}>Легко открывай в симуляторе сейчас — получай выгодные бонусы после полного запуска.</h3>
            <div className={styles.cases}>
                <CasesBlock casesArray={data} />
                <Partners />
                <CasesBlock casesArray={data} />
            </div>

        </section>);
}
export default CasesPage;