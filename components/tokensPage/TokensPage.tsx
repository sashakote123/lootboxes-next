'use client'

import styles from './styles.module.css'
import fire from './../../sources/images/coins/Coin.png'
import Image from 'next/image';
import Link from 'next/link';
import cart from './../../sources/images/coins/shopping-cart.svg'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TokensPage = () => {

    const user = useSelector((state: RootState) => state.user)

    return (
        <div className={styles.container}>
            <section className={styles.tokensPage}>
                <Image className={styles.image} src={fire} alt='fire' />
                <h1 className={styles.pageTitle}>
                    <div className={styles.titleValue}>{user.coins}</div>
                    <div className={styles.titleText}>токенов</div>

                </h1>

                <div className={styles.description}>
                    <div className={styles.descTitle}>Твой баланс</div>
                    <div className={styles.descText}>Зарабатывай токены, выполняя задания от партнеров
                        и смотря короткие рекламные видео. Делись бонусной ссылкой с друзьями и получай дополнительную валюту.</div>
                </div>
                <Link href='/buyTotens' className={styles.buyBtn}>
                    Купить токены
                    <Image src={cart} alt='cart' />
                </Link>
            </section>
        </div>

    );
}
export default TokensPage;