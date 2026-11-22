import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { taskRequest } from 'src/app/models/task-request.model';
import { taskResponse } from 'src/app/models/task-response.model';

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

  hasError: boolean = false

  submitTask(): void {  
    const trimmedTaskName = this.taskName.trim() 

    if (trimmedTaskName === "") {
      this.hasError = true
      return
    }

    this.hasError = false

    const task: taskRequest = {
      titulo: trimmedTaskName
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
    } else {
      this.taskName = ""
    }

    this.hasError = false
  }

}
