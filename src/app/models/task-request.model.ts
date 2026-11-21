import { Priority } from "./priority.type";
import { TaskStatus } from "./task-status.type";

export interface taskRequest {
    titulo: string,
    descricao?: string,
    prioridade?: Priority,
    status?: TaskStatus
}