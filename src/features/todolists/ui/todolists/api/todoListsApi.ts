import { instance } from "common/instance/instance"
import { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "common/types"

export const todoListsApi = {
    getTodoList() {
        return instance.get<Todolist[]>("todo-lists")
    },

    addTodoList(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
    },

    removeList(listId: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${listId}`)
    },

    changeTitle(param: { title: string; listId: string }) {
        const { title, listId } = param
        return instance.put<BaseResponse>(`/todo-lists/${listId}`, { title })
    },
}
