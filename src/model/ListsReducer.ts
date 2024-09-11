import {FilterType, ListType} from "../App";

export const ListsReducer = (state: ListType[], action: ActionType): ListType[] => {
    switch (action.type) {
        case "ADD-LIST": {
            return [...state, {listId: action.payload.newId, title: action.payload.title, filter: "all"}]
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

type ActionType = AddListActionType | removeListActionType | setFilterActionType | changeTitleActionType

type AddListActionType = ReturnType<typeof addListActionAc>

type removeListActionType = ReturnType<typeof removeListActionAc>

type setFilterActionType = ReturnType<typeof setFilterActionAc>

type changeTitleActionType = ReturnType<typeof changeListTitleActionAc>

export const addListActionAc = (title: string, newId: string) => {
    return {
        type: "ADD-LIST",
        payload: {
            title,
            newId
        }
    } as const
}

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