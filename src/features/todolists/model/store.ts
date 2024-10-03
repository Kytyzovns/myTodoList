import {combineReducers, legacy_createStore as createStore} from "redux";
import {TaskReducer} from "./TasksReducer";
import {ListsReducer} from "./ListsReducer";
import {appReducer} from "../../../app/app-reducer";

const fullReducer = combineReducers({
    tasks: TaskReducer,
    lists: ListsReducer,
    app: appReducer
})

export type RootState = ReturnType<typeof fullReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(fullReducer)

// @ts-ignore
window.store = store