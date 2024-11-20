import { instance } from "common/instance/instance"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "common/types"

export const tasksApi = {
    getTasks(listId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${listId}/tasks`)
    },

    removeTask(param: { listId: string; id: string }) {
        const { listId, id } = param
        return instance.delete<BaseResponse>(`todo-lists/${listId}/tasks/${id}`)
    },

    addTask(param: { listId: string; title: string }) {
        const { listId, title } = param
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${listId}/tasks`, { title })
    },

    updateTask(param: { listId: string; id: string; model: UpdateTaskModel }) {
        const { listId, model, id } = param
        return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${listId}/tasks/${id}`, model)
    },
}
