import Link from 'next/link';
import styles from './styles.module.css'
import Image from 'next/image';

import tg from './../../sources/images/mainPage/tgdark.svg'
import bg from './../../sources/images/cases/6.png'
import SFProDisplay from '@/app/fonts';

const Partners = () => {
    return (
        <section className={styles.partners}>
            <h3 className={styles.partnersTitle}>Кейс от партнера</h3>
            <h4 className={`${SFProDisplay.regular.className} ${styles.partnersSubTitle}`}>Подпишись на канал нашего партнера в Телеграм
                и получи открытие кейса — «Морская волна»</h4>

            <Link href='/' className={styles.linkBtn}>
                подписаться
                <Image src={tg} alt='tg' />
            </Link>

            <Image quality={100} unoptimized={true} className={styles.bgImage} src={bg} alt='bg' />
        </section>
    );
}
export default Partners;