import React, {useMemo} from 'react';
import s from "../../../../../../styles/Styles.module.css";
import {TasksType, TaskType} from "../../../../model/TasksReducer";
import {useSelector} from "react-redux";
import {StoreType} from "../../../../model/store";
import {ListType} from "../../../../model/ListsReducer";
import {Task} from "./task/Task";

type TasksProps = {
    list: ListType
}
export const Tasks = ({list}: TasksProps) => {
    const {filter, listId} = list
    const tasks = useSelector<StoreType, TasksType>(state => state.tasks)

    const filteredTasks: TaskType[] = useMemo(() => {
        console.log("tasks", tasks)
        let fTasks = [...tasks[listId]]
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

