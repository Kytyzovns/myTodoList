import { Todolist } from "../ui/todolists/api/todolistsApi.types"
import { removeListActionType } from "./ListsReducer"
import { DomainTask, UpdateTaskModel } from "../ui/todolists/api/tasksApi.types"
import { AppDispatch, RootState } from "./store"
import { tasksApi } from "../ui/todolists/api/tasksApi"
import { TaskStatus } from "common/enums"

export type TasksType = {
    [listId: string]: DomainTask[]
}

export const TaskReducer = (state: TasksType = {}, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].filter((t) => t.id !== action.payload.id),
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.listId]: [...state[action.payload.listId], action.payload.task],
            }
        }

        case "ADD-LIST-TASK": {
            return { ...state, [action.payload.id]: [] }
        }
        case "UPDATE_TASK": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].map((t) =>
                    t.id === action.payload.id ? action.payload.task : { ...t },
                ),
            }
        }
        case "SET_TASKS": {
            return { ...state, [action.payload.id]: action.payload.tasks }
        }
        case "REMOVE-LIST": {
            let tempState = { ...state }
            delete tempState[action.payload.listId]
            return tempState
        }
        default:
            return state
    }
}

type ActionType =
    | removeTaskActionType
    | addTaskActionType
    | addListTaskType
    | taskSetDoneType
    | setTasksAcType
    | removeListActionType

type removeTaskActionType = ReturnType<typeof removeTaskAc>

type addTaskActionType = ReturnType<typeof addTaskAc>

export type addListTaskType = ReturnType<typeof addListTaskAc>

type taskSetDoneType = ReturnType<typeof updateTaskAc>

type setTasksAcType = ReturnType<typeof setTasksAc>

export const removeTaskAc = (payload: { listId: string; id: string }) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}

export const addTaskAc = (payload: { listId: string; task: DomainTask }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}

export const addListTaskAc = (payload: Todolist) => {
    return {
        type: "ADD-LIST-TASK",
        payload,
    } as const
}

export const updateTaskAc = (payload: { listId: string; id: string; task: DomainTask }) => {
    return {
        type: "UPDATE_TASK",
        payload,
    } as const
}

export const setTasksAc = (payload: { tasks: DomainTask[]; id: string }) => {
    return {
        type: "SET_TASKS",
        payload,
    } as const
}

//Thunk

export const setTasksTC = (listId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    tasksApi.getTasks(listId).then((res) => {
        dispatch(setTasksAc({ tasks: res.data.items, id: listId }))
    })
}

export const updateTaskTC =
    (param: { listId: string; id: string; status?: TaskStatus; title?: string }) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        const { listId, id, status, title } = param
        let task = getState().tasks[listId].find((t) => t.id === id)

        if (task) {
            const model: UpdateTaskModel = {
                title: title || task.title,
                description: task.description,
                status: status ?? task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }

            tasksApi.updateTask({ listId, id, model }).then((res) => {
                dispatch(updateTaskAc({ listId, id, task: res.data.data.item }))
            })
        }
    }

export const removeTaskTC =
    (param: { listId: string; id: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
        tasksApi.removeTask(param).then(() => {
            dispatch(removeTaskAc(param))
        })
    }

export const addTaskTC =
    (param: { listId: string; title: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
        tasksApi.addTask(param).then((res) => {
            dispatch(addTaskAc({ listId: param.listId, task: res.data.data.item }))
        })
    }
