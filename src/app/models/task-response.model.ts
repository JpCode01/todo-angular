import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";

export interface taskResponse {
    id: number,
    titulo: string,
    descricao: string,
    prioridade: Priority,
    status: TaskStatus
}