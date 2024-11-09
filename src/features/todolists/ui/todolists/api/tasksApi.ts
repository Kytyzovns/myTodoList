import {instance} from "../../../../../common/instance/instance";
import {DomainTask} from "./tasksApi.types";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<DomainTask[]>(`${todolistId}/tasks`)
    }
}