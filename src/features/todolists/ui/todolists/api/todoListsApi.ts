import axios from "axios"
import { instance } from "../../../../../common/instance/instance"
import { Todolist } from "./todolistsApi.types"

export const todoListsApi = {
    getTodoList() {
        return instance.get<Todolist[]>("todo-lists")
    },
}
