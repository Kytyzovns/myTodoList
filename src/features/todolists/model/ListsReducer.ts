import { addListTaskAc, addListTaskType } from "./TasksReducer"
import { Todolist } from "../ui/todolists/api/todolistsApi.types"
import { AppDispatch, RootState } from "./store"
import { todoListsApi } from "../ui/todolists/api/todoListsApi"

export type FilterType = "all" | "completed" | "active"

export type ListType = {
    filter: FilterType
} & Todolist

export const ListsReducer = (state: ListType[] = [], action: ActionType): ListType[] => {
    switch (action.type) {
        case "ADD-LIST-TASK": {
            return [...state, { ...action.payload, filter: "all" }]
        }
        case "REMOVE-LIST": {
            return state.filter((l) => l.id !== action.payload.listId)
        }
        case "CHANGE-TITLE": {
            return state.map((l) => (l.id === action.payload.listId ? { ...l, title: action.payload.title } : { ...l }))
        }
        case "SET-FILTER": {
            return state.map((l) =>
                l.id === action.payload.listId ? { ...l, filter: action.payload.filter } : { ...l },
            )
        }
        case "SET_LISTS": {
            return action.payload.lists.map((l) => ({ ...l, filter: "all" }))
        }
        default:
            return state
    }
}

type ActionType = removeListActionType | setFilterActionType | changeTitleActionType | addListTaskType | setListsAcType

export type removeListActionType = ReturnType<typeof removeListActionAc>

type setFilterActionType = ReturnType<typeof setFilterActionAc>

type changeTitleActionType = ReturnType<typeof changeListTitleAc>

type setListsAcType = ReturnType<typeof setListsAc>

export const removeListActionAc = (payload: { listId: string }) => {
    return {
        type: "REMOVE-LIST",
        payload,
    } as const
}

export const setFilterActionAc = (payload: { listId: string; filter: FilterType }) => {
    return {
        type: "SET-FILTER",
        payload,
    } as const
}

export const changeListTitleAc = (payload: { listId: string; title: string }) => {
    return {
        type: "CHANGE-TITLE",
        payload,
    } as const
}

export const setListsAc = (lists: Todolist[]) => {
    return {
        type: "SET_LISTS",
        payload: {
            lists,
        },
    } as const
}

//Thunk

export const setListsTC = () => (dispatch: AppDispatch, getState: () => RootState) => {
    todoListsApi.getTodoList().then((res) => {
        dispatch(setListsAc(res.data))
    })
}

export const addListTC = (title: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    todoListsApi.addTodoList(title).then((res) => {
        dispatch(addListTaskAc(res.data.data.item))
    })
}

export const removeListTC = (listId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    todoListsApi.removeList(listId).then(() => {
        dispatch(removeListActionAc({ listId }))
    })
}

export const changeListTitleTC =
    (param: { title: string; listId: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
        todoListsApi.changeTitle(param).then(() => {
            dispatch(changeListTitleAc(param))
        })
    }
