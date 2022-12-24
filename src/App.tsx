import { useEffect, useState } from "react";
import "./App.scss";
import Timer from './components/Timer';
import Table from './components/Table';
import TasksList from './components/TasksList';
import Nav from './components/Nav';
import { Task, colorLuminance } from './utils';

function App() {
    const [time, setTime] = useState(0);
    const [index, setIndex] = useState(-1);
    const [interv, setInterv] = useState(0);
    const [allTasks, setAllTasks] = useState<Task[]>(
        [
            { name: "Working", duration: 0 },
            { name: "Learning", duration: 0 },
            { name: "Tinkering", duration: 0 },
            { name: "Wasted", duration: 0 }
        ]
    );

    const [color, setColor] = useState("#282828");
    useEffect(() => {
        document.documentElement.style.cssText = `
--primary: ${color};
--primary-dark: ${colorLuminance(color, -0.3)};
--primary-light: ${colorLuminance(color, 0.3)};
`
    });

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

    const onStop = () => {
        if (index != -1) {
            const tmp = [...allTasks];
            tmp[index].duration += time;
            window.clearInterval(interv);
            setAllTasks(tmp);
            setIndex(-1);
        }
    }

    return (
        <div className="app">
            <Nav items={allTasks.map(e => e.name)} />
            <div className="content">
                <TasksList tasks={allTasks} onClick={onStart} />
                <div className="current">
                    <Timer time={time} onStop={onStop} />
                    <Table
                        headers={allTasks.map((task: Task) => task.name)}
                        data={allTasks.map((task: Task) => Math.floor(task.duration / 60))}
                    />
                </div>
            </div>
            <div className="add-btn">

            </div>
        </div>
    );
}

export default App;
