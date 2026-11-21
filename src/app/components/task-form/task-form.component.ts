import { Component, EventEmitter, Input, Output } from '@angular/core';
import { taskRequest } from 'src/app/models/task-request.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input({ required: true }) title!: string
  @Output() taskSubmitted = new EventEmitter<taskRequest>()

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
    
    this.taskSubmitted.emit(task)
  }

}
