import { Component, EventEmitter, Input, Output } from '@angular/core';
import { taskResponse } from 'src/app/models/task-response.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input({ required: true }) tasks: taskResponse[] = []
  @Output() taskDeleted = new EventEmitter<number>()
  @Output() taskSelected = new EventEmitter<taskResponse>

  onDeleteTask(id: number): void {
    this.taskDeleted.emit(id)
  }

  onEditTask(task: taskResponse): void {
    this.taskSelected.emit(task)
  }


}
