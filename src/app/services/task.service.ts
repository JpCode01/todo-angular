import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskResponse } from '../models/task-response.model';
import { taskRequest } from '../models/task-request.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = "http://localhost:8080/tarefas"

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<taskResponse[]> {
    return this.httpClient.get<taskResponse[]>(this.API_URL)
  }

  createTask(task: taskRequest): Observable<taskResponse> {
    return this.httpClient.post<taskResponse>(
      this.API_URL,
      task  
    )
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.API_URL}/${id}`
    )
  }

  updateTask(id: number, task: taskRequest): Observable<taskResponse> {
    return this.httpClient.put<taskResponse>(
      `${this.API_URL}/${id}`,
      task
    )
  }
}