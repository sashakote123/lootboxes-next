import Image from 'next/image';
import styles from './styles.module.css'
import img from './../../sources/images/mainPage/daily2.png'

interface Props {
    name: string,
    id: number
}

const UserCard: React.FC<Props> = ({ name, id }) => {
    return (
        <section className={styles.user}>
            <Image className={styles.userAvatar} src={img} alt='avatar' />
            <div className={styles.useInfo}>
                <h2 className={styles.userName}>{name}</h2>
                <div className={styles.useId}>ID: {id}</div>
            </div>
        </section>
    );
}
export default UserCard;