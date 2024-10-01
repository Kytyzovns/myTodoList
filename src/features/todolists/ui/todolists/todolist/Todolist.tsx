import React, {memo, useCallback} from 'react';
import s from '../../../../../styles/Styles.module.css'
import {AddItem} from "../../../../../common/components/AddItem/AddItem";
import {AddTaskButton} from "../../../../../MaterialStyles";
import {addTaskAc, TaskType} from "../../../model/TasksReducer";
import {ListType} from "../../../model/ListsReducer";
import {FilterTasksButtons} from "./flitertasksbuttons/FilterTasksButtons";
import {Tasks} from "./tasks/Tasks";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {useDispatch} from "react-redux";

type TodolistType = {
    list: ListType
}

export const Todolist: React.FC<TodolistType> = memo(({
                                                          list
                                                      }) => {
    const {listId} = list
    const dispatch = useDispatch();

    const addTaskHandler = useCallback((title: string) => {
        addTask(listId, title);
    }, []);

    const addTask = useCallback((listId: string, title: string) => {
        dispatch(addTaskAc({listId, title}))
    }, [])

    return (
        <div className={s.list}>
            <TodoListTitle list={list} />
            <AddItem buttonVariant={"contained"} sxButtonStyles={AddTaskButton} addItem={addTaskHandler}
                     buttonName={"+"}/>
            <Tasks list={list}/>
            <FilterTasksButtons list={list}/>
        </div>
    );
});




