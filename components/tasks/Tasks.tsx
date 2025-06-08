import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.css'

import tg from './../../sources/images/mainPage/tglight.svg'
import social from './../../sources/images/mainPage/social.svg'
import arrow from './../../sources/images/mainPage/arrowDark.svg'
import ok from './../../sources/images/mainPage/okdark.svg'

import fire from './../../sources/images/mainPage/fireblue.svg'

interface ITasks {
    img: StaticImageData,
    title: string,

    isComplete: boolean,
    reward: number,
}

const tasks: ITasks[] = [
    {
        img: tg,
        title: 'Подпишись на Телеграм-канал',
        isComplete: true,
        reward: 200,
    },
    {
        img: social,
        title: 'Пригласи в игру друга — Вдвоем всегда веселее!',
        isComplete: false,
        reward: 100,
    },
    {
        img: tg,
        title: 'Подпишись на Телеграм-канал партнёров',
        isComplete: false,
        reward: 200,
    },
]


const Tasks = () => {
    return (
        <section className={styles.tasks}>
            <h2 className={styles.title}>Задания <span>(2)</span></h2>
            <ul className={styles.tasksList}>
                {tasks.map((item: ITasks, index: number) => {
                    return <li key={index} className={styles.task}>
                        <div className={styles.taskImage}>
                            <Image src={item.img} alt='image' />
                        </div>
                        <div className={styles.taskInfo}>
                            <div className={styles.infoTitle}>{item.title}</div>
                            <div className={styles.infoReward}>
                                +{item.reward}
                                <Image src={fire} alt='image' />
                            </div>
                        </div>
                        {item.isComplete ? <div className={styles.completed}>
                            <Image src={ok} alt='image' />
                        </div> :
                            <button className={styles.completeBtn}>
                                <Image src={arrow} alt='image' />
                            </button>}


                    </li>
                })}

            </ul>
        </section>
    );
}
export default Tasks;