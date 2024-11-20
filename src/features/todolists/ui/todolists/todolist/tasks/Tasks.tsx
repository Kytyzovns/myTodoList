import React, { useEffect, useMemo } from "react"
import s from "../../../../../../styles/Styles.module.css"
import { ListType } from "../../../../model/ListsReducer"
import { Task } from "./task/Task"
import { useAppSelector } from "common/hooks/useAppSelector"
import { tasksSelector } from "../../../../model/tasksSelectors"
import { DomainTask } from "../../api/tasksApi.types"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TaskStatus } from "common/enums"
import { setTasksTC } from "../../../../model/TasksReducer"

type TasksProps = {
    list: ListType
}
export const Tasks = ({ list }: TasksProps) => {
    const { filter, id } = list
    const tasks = useAppSelector(tasksSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(id))
    }, [])

    const filteredTasks: DomainTask[] = useMemo(() => {
        if (!tasks[id]) return []
        let fTasks = [...tasks[id]]
        if (filter === "completed") {
            fTasks = fTasks.filter((t) => t.status === TaskStatus.Completed)
        }
        if (filter === "active") {
            fTasks = fTasks.filter((t) => t.status === TaskStatus.New)
        }
        return fTasks
    }, [tasks, list.filter])

    return (
        <ul className={s.ul}>
            {filteredTasks.map((task) => (
                <Task key={task.id} list={list} task={task} />
            ))}
        </ul>
    )
}
