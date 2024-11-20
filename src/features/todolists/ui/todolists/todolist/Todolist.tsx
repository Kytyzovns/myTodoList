import React, { memo, useCallback } from "react"
import s from "../../../../../styles/Styles.module.css"
import { AddItem } from "common/components/AddItem/AddItem"
import { AddTaskButton } from "../../../../../MaterialStyles"
import { addTaskAc, addTaskTC } from "../../../model/TasksReducer"
import { addListTC, ListType } from "../../../model/ListsReducer"
import { FilterTasksButtons } from "./flitertasksbuttons/FilterTasksButtons"
import { Tasks } from "./tasks/Tasks"
import { TodoListTitle } from "./TodoListTitle/TodoListTitle"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type TodolistType = {
    list: ListType
}

export const Todolist: React.FC<TodolistType> = memo(({ list }) => {
    const { id: listId } = list
    const dispatch = useAppDispatch()

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskTC({ title, listId }))
    }, [])

    return (
        <div className={s.list}>
            <TodoListTitle list={list} />
            <AddItem
                buttonVariant={"contained"}
                sxButtonStyles={AddTaskButton}
                addItem={addTaskHandler}
                buttonName={"+"}
            />
            <Tasks list={list} />
            <FilterTasksButtons list={list} />
        </div>
    )
})
