import styles from './Nav.module.scss';

interface NavProp {
    items: string[]
}

export default function Nav(prop: NavProp) {
    return <ul className={styles.nav}>
        {prop.items.map((item: string) =>
            <li key={item} className={styles.item}>
                <div className={styles.filler}></div>
                <span className={styles.title}>{item}</span>
            </li>
        )}
    </ul>;
}
