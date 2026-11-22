import { Priority } from "./priority.enum";
import { TaskStatus } from "./task-status.enum";

export interface taskRequest {
    titulo: string,
    descricao?: string,
    prioridade?: Priority,
    status?: TaskStatus
}