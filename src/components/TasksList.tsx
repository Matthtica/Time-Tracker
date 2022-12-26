import styles from './TasksList.module.scss';
import { Task } from '../utils';

interface TasksListProp {
    tasks: Task[],
    onStart: (arg: number) => void,
    onDelete: (ind: number) => void;
}

export default function TasksList(prop: TasksListProp) {

    return <ul className={styles.tlist}>
        {prop.tasks.map((task: Task, ind: number) =>
            <li onContextMenu={() => prop.onDelete(ind)} key={task.name} className={styles.item} onClick={() => prop.onStart(ind)}>
                <div className={styles.filler}></div>
                <span className={styles.name}>{task.name}</span>
            </li>
        )}
    </ul>;
}
