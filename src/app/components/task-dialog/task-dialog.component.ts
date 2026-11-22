import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { taskRequest } from 'src/app/models/task-request.model';
import { taskResponse } from 'src/app/models/task-response.model';

interface TaskDialogData {
  title: string;
  task: taskResponse | null;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) {}

  onTaskSubmitted(task: taskRequest): void {
    this.dialogRef.close({
      type: 'create',
      data: task
    })
  }

  onTaskUpdated(event: {id: number, data: taskRequest}): void {
    this.dialogRef.close({
      type: 'update',
      id: event.id,
      data: event.data
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
