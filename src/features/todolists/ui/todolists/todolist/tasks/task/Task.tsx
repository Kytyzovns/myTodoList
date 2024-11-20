import React, { useCallback } from "react"
import s from "../../../../../../../styles/Styles.module.css"
import Checkbox from "@mui/material/Checkbox"
import { DynamicField } from "common/components/DynamicField/DynamicField"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { ListType } from "../../../../../model/ListsReducer"
import { removeTaskTC, updateTaskTC } from "../../../../../model/TasksReducer"
import { DomainTask } from "../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type TaskProps = {
    list: ListType
    task: DomainTask
}
export const Task = ({ list, task }: TaskProps) => {
    const { id: listId } = list
    const dispatch = useAppDispatch()

    const updateTaskHandler = (param: { id: string; status?: TaskStatus; title?: string }) => {
        const { id, status, title } = param
        dispatch(updateTaskTC({ id, title, status, listId }))
    }

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC({ id: task.id, listId }))
    }, [])

    return (
        <li className={`${s.li} + ${task.status === TaskStatus.Completed ? s.done : ""}`} key={task.id}>
            <Checkbox
                checked={task.status === TaskStatus.Completed}
                onChange={(e) =>
                    updateTaskHandler({
                        id: task.id,
                        status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
                    })
                }
            />
            <DynamicField currentTitle={task.title} setValue={(title) => updateTaskHandler({ id: task.id, title })} />
            <IconButton onClick={() => removeTaskHandler()}>
                <DeleteIcon />
            </IconButton>
        </li>
    )
}
