import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Priority } from 'src/app/models/priority.enum';
import { taskRequest } from 'src/app/models/task-request.model';
import { taskResponse } from 'src/app/models/task-response.model';
import { TaskStatus } from 'src/app/models/task-status.enum';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input({ required: true }) title!: string
  @Input() task: taskResponse | null = null
  @Output() taskSubmitted = new EventEmitter<taskRequest>()
  @Output() taskUpdated = new EventEmitter<{
    id: number,
    data: taskRequest
  }>()
  @Output() taskCancelled = new EventEmitter<void>()

  taskName: string = ""

  taskDescription: string = ""

  priorityList: Priority[] = Object.values(Priority)

  statusList: TaskStatus[] = Object.values(TaskStatus)

  taskPriority: Priority = Priority.MEDIA

  taskStatus: TaskStatus = TaskStatus.PENDENTE

  hasError: boolean = false

  submitTask(): void {  
    const trimmedTaskName = this.taskName.trim() 
    const trimmedTaskDescription = this.taskDescription.trim() 

    if (trimmedTaskName === "") {
      this.hasError = true
      return
    }

    this.hasError = false

    const task: taskRequest = {
      titulo: trimmedTaskName,
      descricao: trimmedTaskDescription,
      prioridade: this.taskPriority,
      status: this.task !== null
      ? this.taskStatus
      : TaskStatus.PENDENTE
    }

    if (this.task !== null) {
      this.taskUpdated.emit({
        id: this.task.id,
        data: task
      })
    } else {
      this.taskSubmitted.emit(task)
    }
  }

  cancelEdit(): void {
    this.taskCancelled.emit()
  }

  ngOnChanges(): void {
    if (this.task !== null) {
      this.taskName = this.task.titulo
      this.taskDescription = this.task.descricao ?? ""
      this.taskPriority = this.task.prioridade ?? Priority.MEDIA
      this.taskStatus = this.task.status ?? TaskStatus.PENDENTE
    } else {
      this.resetForm()
    }
  }

  resetForm(): void {
    this.taskName = ""
    this.taskDescription = ""
    this.taskPriority = Priority.MEDIA
    this.taskStatus = TaskStatus.PENDENTE
    this.hasError = false
  }

}
