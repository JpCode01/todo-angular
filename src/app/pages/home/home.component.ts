import { Component, OnInit } from '@angular/core';
import { taskRequest } from 'src/app/models/task-request.model';
import { taskResponse } from 'src/app/models/task-response.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private taskService: TaskService) {}

  pageTitle: string = "Minhas Tarefas"
  description: string = "Mantenha sua rotina sob controle de forma simples e rápida. Com o TODO-LIST, você anota suas ideias em segundos, define prazos e acompanha tudo o que precisa fazer em um só lugar."

  canCreateTask: boolean = true

  formTitle: string = "Cadastrar nova tarefa"

  tasks: taskResponse[] = []
  
  onTaskSubmitted(task: taskRequest): void {
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        this.tasks.push(createdTask)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onCreateTask(): void {
    this.canCreateTask = false
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
}
