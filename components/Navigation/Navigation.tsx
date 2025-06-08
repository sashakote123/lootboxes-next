"use client"

import Link from 'next/link';
import styles from './styles.module.css'

import boxes1 from './../../sources/images/navigation/boxes1.svg'
import home1 from './../../sources/images/navigation/home1.svg'
import leaders1 from './../../sources/images/navigation/leaders1.svg'
import profile1 from './../../sources/images/navigation/profile1.svg'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();


    return (
        <nav className={styles.nav}>
            <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}  href='/'>
                <Image src={home1} alt="home" />
                <div className={styles.linkItem}>Главная</div>
            </Link>
            <Link className={`${styles.link} ${pathname === '/boxes' ? styles.active : ''}`}  href='/boxes'>
                <Image src={boxes1} alt="boxes1" />
                <div className={styles.linkItem}>Кейсы</div>
            </Link>
            <Link className={`${styles.link} ${pathname === '/leaderboard' ? styles.active : ''}`}  href='/leaderboard'>
                <Image src={leaders1} alt="leaders1" />
                <div className={styles.linkItem}>Лидерборд</div>
            </Link>
            <Link className={`${styles.link} ${pathname === '/profile' ? styles.active : ''}`}  href='/profile'>
                <Image src={profile1} alt="profile1" />
                <div className={styles.linkItem}>Профиль</div>
            </Link>
        </nav>
    );
}
export default Navigation;