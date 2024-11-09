import {addListTaskType} from "./TasksReducer";
import {Todolist} from "../ui/todolists/api/todolistsApi.types";

export type FilterType = "all" | "completed" | "active"

export type ListType = {
    filter: FilterType
} & Todolist

export const ListsReducer = (state: ListType[] = [], action: ActionType): ListType[] => {
    switch (action.type) {
        case "ADD-LIST-TASK": {
            return [...state, {
                id: action.payload.listId,
                title: action.payload.title ? action.payload.title : "new list",
                filter: "all", order: state.length, addedDate: new Date().toString()
            }]
        }
        case "REMOVE-LIST": {
            return state.filter(l => l.id !== action.payload.listId)
        }
        case "CHANGE-TITLE": {
            return state.map(l => l.id === action.payload.listId ? {...l, title: action.payload.title} : {...l})
        }
        case "SET-FILTER": {
            return state.map(l => l.id === action.payload.listId ? {...l, filter: action.payload.filter} : {...l})
        }
        case "SET_LISTS": {
            return action.payload.lists.map((l) => ({...l, filter: "all"}))
        }
        default:
            return state
    }
}

type ActionType = removeListActionType | setFilterActionType | changeTitleActionType | addListTaskType | setListsAcType

type removeListActionType = ReturnType<typeof removeListActionAc>

type setFilterActionType = ReturnType<typeof setFilterActionAc>

type changeTitleActionType = ReturnType<typeof changeListTitleActionAc>

type setListsAcType = ReturnType<typeof setListsAc>

export const removeListActionAc = (payload: {listId: string}) => {
    return {
        type: "REMOVE-LIST",
        payload
    } as const
}

export const setFilterActionAc = (payload: {listId: string, filter: FilterType}) => {
    return {
        type: "SET-FILTER",
        payload
    } as const
}

export const changeListTitleActionAc = (payload: {listId: string, title: string}) => {
    return {
        type: "CHANGE-TITLE",
        payload
    } as const
}

export const setListsAc = (lists: Todolist[]) => {
    return {
        type: "SET_LISTS",
        payload: {
            lists
        }
    } as const
}