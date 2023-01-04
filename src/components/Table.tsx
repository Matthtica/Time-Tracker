import styles from './Table.module.scss';

interface TableProp {
    headers: string[],
    data: number[],
    del: (arg: number) => void
}

export default function Table(prop: TableProp) {
    return <div className={styles.table}>
        <div className={styles.header}>
            {prop.headers.map((head: string, ind: number) => <span className={styles.head} onClick={() => prop.del(ind)}>{head}</span>)}
        </div>
        <div className={styles.data}>
            {prop.data.map((duration: number) => <span className={styles.duration}>{duration}</span>)}
        </div>
    </div>;
}
