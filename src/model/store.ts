import {combineReducers, legacy_createStore as createStore} from "redux";
import {TaskReducer} from "./TasksReducer";
import {ListsReducer} from "./ListsReducer";

const fullReducer = combineReducers({
    tasks: TaskReducer,
    lists: ListsReducer
})

export type StoreType = ReturnType<typeof fullReducer>;

export const store = createStore(fullReducer)

// @ts-ignore
window.store = store