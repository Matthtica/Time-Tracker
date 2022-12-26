import { useState } from 'react';
import style from './Dialog.module.scss';

interface DialogProp {
    onAdd: (arg: string) => void;
}

export default function Dialog(prop: DialogProp) {
    const [text, setText] = useState("");
    const [active, setActive] = useState(false);

    const onAddBtnClick = () => {
        setActive(true);
    }

    const onClose = () => {
        setActive(false);
    }

    const onConfirm = () => {
        if (text != "") {
            prop.onAdd(text);
            onClose();
            setText("");
        }
    }

    return <div className={style.content}>
        <div className={`${style.dialog} ${active ? style.activediag : ""}`}>
            <div className={style.header}>
                <h3 className={style.title}>What is your task?</h3>
                <button className={style.closebtn} onClick={onClose}>&times;</button>
            </div>
            <div className={style.body}>
                <input type="text" onChange={(e) => setText(e.target.value)} />
            </div>
            <button className={style.confirm} onClick={onConfirm}>
                Confirm
            </button>
        </div>
        <button onClick={onAddBtnClick} className={style.addbtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
        </button>
        <div onClick={onClose} className={`${style.overlay} ${active ? style.active : ""}`}></div>
    </div >;
}
