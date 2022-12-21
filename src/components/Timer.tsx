import styles from './Timer.module.scss';

interface TimerProp {
    time: number,
    onStop: () => void,
}

export default function Timer(prop: TimerProp) {
    const dists = Array.from(Array(60).keys()).map((i: number) => i * 6);

    return (
        <div className={styles.current}>
            <div className={styles.timer}>
                <svg className={styles.clock} width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <line id="tick" x1="50" y1="2" x2="50" y2="6" strokeWidth="0.8" strokeLinecap="round" />
                        <g id="ticks">
                            {dists.map((i: number) =>
                                <use href="#tick" transform={`rotate(${i})`} stroke="var(--ticks-color)" transform-origin="50 50" />
                            )}
                            <use href="#tick" stroke="var(--tick-color)" transform-origin="50 50" />;
                        </g>
                    </defs>
                    <use href="#ticks" transform={`rotate(${(prop.time % 60) * 6})`} transform-origin="50 50" />
                </svg>
                <div className={styles.inner} onClick={prop.onStop}>
                    <div className={styles.btn}>
                        <p>{Math.floor(prop.time / (60 * 60)) % 24}:{Math.floor(prop.time / 60) % 60}:{prop.time % 60}</p>
                        <svg className={styles.pause} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M10 24h-6v-24h6v24zm10-24h-6v24h6v-24z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
