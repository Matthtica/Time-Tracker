import style from './HomeScreen.module.scss';
import { Task } from '../utils';
import TasksList from './TasksList';
import Timer from './Timer';
import Table from './Table';
import { useEffect, useState } from 'react';
import Dialog from './Dialog';
import xlsx from 'xlsx';
import fs from 'fs';
import records from '../records.json';

export default function HomeScreen() {
    const [time, setTime] = useState(0);
    const [index, setIndex] = useState(-1);
    const [interv, setInterv] = useState(0);

    const [allTasks, setAllTasks] = useState<Task[]>(
        [
            { name: "Working", duration: 0 },
            { name: "Learning", duration: 0 },
            { name: "Tinkering", duration: 0 },
            { name: "Wasting", duration: 0 },
            { name: "Reading", duration: 0 },
            { name: "Managing", duration: 0 },
            { name: "Movie", duration: 0 },
        ]
    );
    useEffect(() => {
        const dataJson = localStorage.getItem("records");
        const timejson = localStorage.getItem("date");
        if (dataJson == null || timejson == null) return;

        const time = JSON.parse(timejson);
        const now = new Date();
        console.log(now.getFullYear(), now.getMonth(), now.getDate());
        if (time != now.getDate()) return;

        const data = JSON.parse(dataJson);
        setAllTasks(data);
        console.log(data);
    }, []);

    let j = 0;

    const run = () => {
        j++;
        setTime(j);
    }

    const onStart = (ind: number) => {
        onStop();
        setInterv(window.setInterval(run, 1000));
        setIndex(ind);
    }

    const save = () => {
        localStorage.setItem("records", JSON.stringify(allTasks));
        const date = new Date();
        localStorage.setItem("date", JSON.stringify(date.getDate()));
    }

    const onStop = async () => {
        if (index != -1) {
            const tmp = [...allTasks];
            tmp[index].duration += time;
            window.clearInterval(interv);
            setAllTasks(tmp);
            setIndex(-1);
            setTime(0);
            j = 0;
            save();
        }
    }

    const onDeleteItem = (ind: number) => {
        const tmp = [...allTasks];
        tmp.splice(ind, 1);
        setAllTasks(tmp);
    }

    const onAddNewItem = (name: string) => {
        setAllTasks([...allTasks, { name: name, duration: 0 }]);
    }

    return <div className={style.home}>
        <TasksList tasks={allTasks} onStart={onStart} onDelete={onDeleteItem} />
        <div className={style.content}>
            <Timer time={time} title={index != -1 ? allTasks[index].name : ""} onStop={onStop} />
            <Table
                headers={allTasks.map((task: Task) => task.name)}
                data={allTasks.map((task: Task) => Math.floor(task.duration / 60))}
                del={onDeleteItem} />
        </div>
        <Dialog onAdd={onAddNewItem} />
    </div>;
}
