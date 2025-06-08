import Image from 'next/image';
import styles from './styles.module.css'
import Link from 'next/link';

import tg from './../../sources/images/mainPage/tgdark.svg'
import work from './../../sources/images/atWork/work.svg'
import SFProDisplay from '@/app/fonts';


const AtWork = () => {
    return (
        <section className={styles.atWork}>
            <div className={styles.image}>
                <Image src={work} alt='work' />
            </div>
            <h2 className={styles.title}>В разработке</h2>
            <div className={`${SFProDisplay.regular.className} ${styles.subtitle}`}>Мы активно работаем над тестированием функций
                и введением новых разделов. Следите за обновлениями
                в нашем Телеграм-канале!</div>
            <Link className={styles.linkBtn} href='/'>
                перейти
                <Image src={tg} alt='tg' />
            </Link>
        </section>
    );
}
export default AtWork;