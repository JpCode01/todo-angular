import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from 'src/app/components/task-dialog/task-dialog.component';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
import { taskRequest } from 'src/app/models/task-request.model';
import { taskResponse } from 'src/app/models/task-response.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog) {}

  @ViewChild(TaskFormComponent)
  taskForm!: TaskFormComponent

  pageTitle: string = "Minhas Tarefas"
  description: string = "Mantenha sua rotina sob controle de forma simples e rápida. Com o TODO-LIST, você anota suas ideias em segundos, define prazos e acompanha tudo o que precisa fazer em um só lugar."

  canCreateTask: boolean = true

  formTitle: string = "Cadastrar nova tarefa"

  tasks: taskResponse[] = []

  selectedTask: taskResponse | null = null

  executionMessage: string = ""
  
  onTaskSubmitted(task: taskRequest): void {
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        this.tasks.push(createdTask)
        this.taskForm.resetForm()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onCreateTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        task: null,
        title: 'Cadastrar nova tarefa'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.type === 'create') {
        this.onTaskSubmitted(result.data);
      }

      if (result?.type === 'update') {
        this.onTaskUpdated({
          id: result.id,
          data: result.data
        });
      }
      })
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onTaskDeleted(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(
          task => task.id !== id
        )
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onTaskSelected(task: taskResponse): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
        width: '600px',
        maxWidth: '95vw',
        data: {
          task: task,
          title: 'Editar tarefa'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.type === 'update') {
          this.onTaskUpdated({
            id: result.id,
            data: result.data
          });
        }
      });
  }

  onTaskUpdated(event: {id: number, data: taskRequest}):void {
    this.taskService.updateTask(event.id, event.data).subscribe({
      next: (updateTask) => {
        this.tasks = this.tasks.map(task =>
          task.id === updateTask.id
          ? updateTask
          : task 
        )
        this.selectedTask = null
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onTaskCancelled(): void {
    this.selectedTask = null
  }

  onTaskExecuted(event: {id: number, email: boolean}): void {
    this.executionMessage = ""

    this.taskService.executeTask(event.id, event.email).subscribe({
      next: (response) => {
        this.executionMessage = response.resultado

        this.tasks = this.tasks.map(task =>
          task.id === response.tarefa.id
          ? response.tarefa
          : task
        )
      },
      error: (err) => {
        console.error(err)
        this.executionMessage = "Erro ao executar a tarefa."
      }
    })
  }
}
