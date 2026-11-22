import { Component, EventEmitter, Input, Output } from '@angular/core';
import { taskResponse } from 'src/app/models/task-response.model';
import { TaskStatus } from 'src/app/models/task-status.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input({ required: true }) tasks: taskResponse[] = []
  @Output() taskDeleted = new EventEmitter<number>()
  @Output() taskSelected = new EventEmitter<taskResponse>()
  @Output() taskExecuted = new EventEmitter<{
    id: number,
    email: boolean
  }>()

  readonly Status = TaskStatus;

  onDeleteTask(id: number): void {
    this.taskDeleted.emit(id)
  }

  onEditTask(task: taskResponse): void {
    this.taskSelected.emit(task)
  }

  onExecuteTask(id: number, email: boolean): void {
    this.taskExecuted.emit({
      id: id,
      email: email
    })
  }
}
