import { Priority } from "./priority.type";
import { TaskStatus } from "./task-status.type";

export interface taskResponse {
    id: number,
    titulo: string,
    descricao: string,
    prioridade: Priority,
    status: TaskStatus
}