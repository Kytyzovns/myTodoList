import {FilterType, ListType} from "../App";
import {addListTaskType} from "./TasksReducer";

export const ListsReducer = (state: ListType[], action: ActionType): ListType[] => {
    switch (action.type) {
        case "ADD-LIST-TASK": {
            return [...state, {
                listId: action.payload.listId,
                title: action.payload.title ? action.payload.title : "new list",
                filter: "all"
            }]
        }
        case "REMOVE-LIST": {
            return state.filter(l => l.listId !== action.payload.listId)
        }
        case "CHANGE-TITLE": {
            return state.map(l => l.listId === action.payload.listId ? {...l, title: action.payload.title} : {...l})
        }
        case "SET-FILTER": {
            return state.map(l => l.listId === action.payload.listId ? {...l, filter: action.payload.filter} : {...l})
        }
        default:
            return state
    }
}

type ActionType = removeListActionType | setFilterActionType | changeTitleActionType | addListTaskType

type removeListActionType = ReturnType<typeof removeListActionAc>

type setFilterActionType = ReturnType<typeof setFilterActionAc>

type changeTitleActionType = ReturnType<typeof changeListTitleActionAc>

export const removeListActionAc = (listId: string) => {
    return {
        type: "REMOVE-LIST",
        payload: {
            listId
        }
    } as const
}

export const setFilterActionAc = (listId: string, filter: FilterType) => {
    return {
        type: "SET-FILTER",
        payload: {
            listId,
            filter
        }
    } as const
}

export const changeListTitleActionAc = (listId: string, title: string) => {
    return {
        type: "CHANGE-TITLE",
        payload: {
            listId,
            title
        }
    } as const
}