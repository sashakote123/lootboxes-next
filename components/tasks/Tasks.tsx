'use client'
import styles from './styles.module.css'



import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ITasks } from '@/types/types';
import TaskItem from '../taskItem/TaskItem';



// const tasks: ITasks[] = [
//     {
//         img: tg,
//         title: 'Подпишись на Телеграм-канал',
//         isComplete: true,
//         reward: 200,
//     },
//     {
//         img: social,
//         title: 'Пригласи в игру друга — Вдвоем всегда веселее!',
//         isComplete: false,
//         reward: 100,
//     },
//     {
//         img: tg,
//         title: 'Подпишись на Телеграм-канал партнёров',
//         isComplete: false,
//         reward: 200,
//     },
// ]




const Tasks = () => {
    const [tasks, setTasks] = useState<ITasks[]>()
    const userId = useSelector((store: RootState) => store.params.tgWebAppData.user.id)


    useEffect(() => {
        fetch(`/api/events/tasks/usertasks/user${userId}`)
            .then(resp => resp.json())
            .then(json => { setTasks(Object.values(json)) })
    }, [userId])




    return (
        <section className={styles.tasks}>
            <h2 className={styles.title}>Задания <span>({tasks? tasks.length : <>...</>})</span></h2>
            <ul className={styles.tasksList}>
                {tasks ? tasks.map((item: ITasks, index: number) => {
                    return <TaskItem key={index} item={item} index={index} />
                }) : <div>loading...</div>}

            </ul>
        </section>
    );
}
export default Tasks;