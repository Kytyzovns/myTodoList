import { instance } from "common/instance/instance"
import { DomainTask, GetTasksResponse } from "./tasksApi.types"

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
}
