import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterType, TaskType} from "./App";
import s from './styles/Styles.module.css'
import {AddItem} from "./AddItem";
import {DynamicField} from "./DynamicField";
import {AddTaskButton, StyledButton} from "./MaterialStyles";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type TodolistType = {
    tasks: Array<TaskType>
    removeList: (listId: string) => void
    listId: string
    addTask: (listId: string, title: string) => void
    listTitle: string
    setFilter: (listId: string, filter: FilterType) => void
    setDone: (listId: string, id: string, isDone: boolean) => void
    removeTask: (listId: string, taskId: string) => void
    filter: FilterType
    changeTaskTitle: (listId: string, title: string, id: string) => void
    changeListTitle: (listId: string, title: string) => void
}

export const Todolist: React.FC<TodolistType> = memo(({
                                                     tasks,
                                                     removeList,
                                                     listId,
                                                     addTask,
                                                     setFilter,
                                                     listTitle,
                                                     setDone,
                                                     removeTask,
                                                     filter,
                                                     changeTaskTitle,
                                                     changeListTitle
                                                 }) => {


    let filteredTasks: TaskType[] = useMemo(() => {
        console.log("tasks", tasks)
        let fTasks = [...tasks]
        if (filter === "completed") {
            fTasks = tasks.filter(t => t.isDone)
        }
        if (filter === "active") {
            fTasks = tasks.filter(t => !t.isDone)
        }
        return fTasks
    }, [tasks, filter])

    const removeListHandler = useCallback(() => {
        removeList(listId);
    }, []);

    const setDoneHandler = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        setDone(listId, id, e.currentTarget.checked);
    }, []);

    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(listId, taskId);
    }, []);

    const addTaskHandler = useCallback((title: string) => {
        addTask(listId, title);
    }, []);

    const changeTaskTitleHandler = useCallback((title: string, id: string) => {
        changeTaskTitle(listId, title, id);
    }, []);

    const changeListTitleHandler = useCallback((title: string) => {
        changeListTitle(listId, title);
    }, []);

    return (
        <div className={s.list}>
            <div>
            <DynamicField currentTitle={listTitle} setValue={changeListTitleHandler} className={s.titleStyle}/>
                <IconButton onClick={removeListHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <AddItem buttonVariant={"contained"} sxButtonStyles={AddTaskButton} addItem={addTaskHandler} buttonName={"+"}/>
            <ul className={s.ul}>
                {filteredTasks.map((task) => (
                    <li className={`${s.li} + ${task.isDone ? s.done : ""}`} key={task.id}>
                        <Checkbox checked={task.isDone} onChange={(e) => setDoneHandler(e, task.id)}/>
                        <DynamicField currentTitle={task.title} setValue={(title) =>changeTaskTitleHandler(title, task.id)}/>
                        <IconButton onClick={() => removeTaskHandler(task.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                ))}
            </ul>
            <StyledButton variant={filter === "all" ? "contained" : "outlined"}
                          onClick={() => setFilter(listId, "all")}>all
            </StyledButton>
            <StyledButton variant={filter === "active" ? "contained" : "outlined"}
                          onClick={() => setFilter(listId, "active")}>active
            </StyledButton>
            <StyledButton variant={filter === "completed" ? "contained" : "outlined"}
                          onClick={() => setFilter(listId, "completed")}>completed
            </StyledButton>
        </div>
    );
});




