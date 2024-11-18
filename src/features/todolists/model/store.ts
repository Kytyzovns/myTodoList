import { applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux"
import { TaskReducer } from "./TasksReducer"
import { ListsReducer } from "./ListsReducer"
import { appReducer } from "../../../app/app-reducer"
import { thunk, ThunkDispatch } from "redux-thunk"

const fullReducer = combineReducers({
    tasks: TaskReducer,
    lists: ListsReducer,
    app: appReducer,
})

export type RootState = ReturnType<typeof fullReducer>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export const store = createStore(fullReducer, {}, applyMiddleware(thunk))

// @ts-ignore
window.store = store
