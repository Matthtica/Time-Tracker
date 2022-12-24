import styles from './TasksList.module.scss';
import { Task } from '../utils';

interface TasksListProp {
    tasks: Task[],
    onClick: (arg: number) => void,
}

export default function TasksList(prop: TasksListProp) {
    return <ul className={styles.tlist}>
        {prop.tasks.map((task: Task, ind: number) =>
            <li key={task.name} className={styles.item} onClick={() => prop.onClick(ind)}>
                <div className={styles.filler}></div>
                <span className={styles.name}>{task.name}</span>
            </li>
        )}
    </ul>;
}
