import {TasksType} from "../App";
import {v1} from "uuid";

export const TaskReducer = (state: TasksType = {}, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].filter(t => t.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.listId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.listId]]
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].map(t => t.id === action.payload.id ? {
                    ...t,
                    title: action.payload.title
                } : {...t})
            }
        }
        case "ADD-LIST-TASK": {
            return {...state, [action.payload.listId]: []}
        }
        case "SET-DONE": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : {...t})
            }
        }
        default:
            return state
    }
}

type ActionType = removeTaskActionType | addTaskActionType | changeTaskTitleType | addListTaskType | taskSetDoneType

type removeTaskActionType = ReturnType<typeof removeTaskAc>

type addTaskActionType = ReturnType<typeof addTaskAc>

type changeTaskTitleType = ReturnType<typeof changeTaskTitleAc>

export type addListTaskType = ReturnType<typeof addListTaskAc>

type taskSetDoneType = ReturnType<typeof taskSetDoneAc>


export const removeTaskAc = (payload: {listId: string, id: string}) => {
    return {
        type: "REMOVE-TASK",
        payload
    } as const
}

export const addTaskAc = (payload: {listId: string, title: string}) => {
    return {
        type: "ADD-TASK",
        payload
    } as const
}

export const changeTaskTitleAc = (payload: {listId: string, id: string, title: string}) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload
    } as const
}

export const addListTaskAc = (payload: {title?: string}) => {
    return {
        type: "ADD-LIST-TASK",
        payload: {...payload, listId: v1()}
    } as const
}

export const taskSetDoneAc = (payload: {listId: string, id: string, isDone: boolean}) => {
    return {
        type: "SET-DONE",
        payload
    } as const
}


