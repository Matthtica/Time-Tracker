import styles from './Table.module.scss';

interface TableProp {
    headers: string[],
    data: number[],
}

export default function Table(prop: TableProp) {
    return <div className={styles.table}>
        <div className={styles.header}>
            {prop.headers.map((head: string) => <span className={styles.head}>{head}</span>)}
        </div>
        <div className={styles.data}>
            {prop.data.map((duration: number) => <span className={styles.duration}>{duration}</span>)}
        </div>
    </div>;
}
