import React, {useCallback} from 'react';
import s from "../../../../../../../styles/Styles.module.css";
import Checkbox from "@mui/material/Checkbox";
import {DynamicField} from "../../../../../../../common/components/DynamicField/DynamicField";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {ListType} from "../../../../../model/ListsReducer";
import {changeTaskTitleAc, removeTaskAc, taskSetDoneAc, TaskType} from "../../../../../model/TasksReducer";
import {useDispatch} from "react-redux";

type TaskProps = {
    list: ListType
    task: TaskType
}
export const Task = ({list, task}: TaskProps) => {
    const {id : listId} = list
    const dispatch = useDispatch();

    const setDoneHandler = useCallback((id: string, isDone: boolean) => {
        dispatch(taskSetDoneAc({isDone, id, listId}))
    }, [])
    const removeTaskHandler = useCallback((id: string) => {
        dispatch(removeTaskAc({id: id, listId}))
    }, [])
    const changeTaskTitleHandler = useCallback((title: string, id: string) => {
        dispatch(changeTaskTitleAc({title, id, listId}))
    }, [])

    return (
        <li className={`${s.li} + ${task.isDone ? s.done : ""}`} key={task.id}>
            <Checkbox checked={task.isDone} onChange={(e) => setDoneHandler(task.id, e.currentTarget.checked)}/>
            <DynamicField currentTitle={task.title}
                          setValue={(title) => changeTaskTitleHandler(title, task.id)}/>
            <IconButton onClick={() => removeTaskHandler(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

