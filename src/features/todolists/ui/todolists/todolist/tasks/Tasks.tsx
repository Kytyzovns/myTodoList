import React, {useEffect, useMemo} from 'react';
import s from "../../../../../../styles/Styles.module.css";
import {TaskType} from "../../../../model/TasksReducer";
import {ListType} from "../../../../model/ListsReducer";
import {Task} from "./task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {tasksSelector} from "../../../../model/tasksSelectors";

type TasksProps = {
    list: ListType
}
export const Tasks = ({list}: TasksProps) => {
    const {filter, id} = list
    const tasks = useAppSelector(tasksSelector)

    const filteredTasks: TaskType[] = useMemo(() => {
        console.log("tasks", tasks)
        let fTasks = [...tasks[id]]
        if (filter === "completed") {
            fTasks = fTasks.filter(t => t.isDone)
        }
        if (filter === "active") {
            fTasks = fTasks.filter(t => !t.isDone)
        }
        return fTasks
    }, [tasks, list.filter])

    return (
        <ul className={s.ul}>
            {filteredTasks.map((task) => (
                <Task key={task.id} list={list} task={task}/>
            ))}
        </ul>
    );
};

