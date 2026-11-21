import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pageTitle: string = "Minhas Tarefas"
  description: string = "Mantenha sua rotina sob controle de forma simples e rápida. Com o TODO-LIST, você anota suas ideias em segundos, define prazos e acompanha tudo o que precisa fazer em um só lugar."

  canCreateTask: boolean = true

  onCreateTask(): void {
    this.canCreateTask = false
  }
}
