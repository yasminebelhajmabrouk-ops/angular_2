import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="task-card" [class.completed]="task.completed">
      <header class="task-header">
        <h3>{{ task.title }}</h3>
        <span class="badge" [ngClass]="task.priority">{{ task.priority | titlecase }}</span>
      </header>
      <p>{{ task.description }}</p>
      <p>Due: {{ task.dueDate | date:'mediumDate' }}</p>
      <p>Tags:
        <ng-container *ngFor="let tag of task.tags; let i = index">
          <small>{{ tag }}<span *ngIf="i < task.tags.length - 1">, </span></small>
        </ng-container>
      </p>
      <button (click)="toggleComplete()">{{ task.completed ? 'Re-open' : 'Mark Complete' }}</button>
      <button (click)="remove.emit(task.id)">Delete</button>
    </article>
  `,
  styles: [
    ".task-card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin: 8px 0; box-shadow: 0 1px 4px rgba(0,0,0,.08); }",
    ".task-card.completed { opacity: 0.6; text-decoration: line-through; }",
    ".task-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }",
    ".badge { padding: 2px 6px; border-radius: 12px; color: #fff; font-size: 0.75rem; }",
    ".badge.low { background: #539e3b; } .badge.medium { background: #f0ad4e; } .badge.high { background: #d9534f; }",
    "button { margin-right: 8px; }",
  ]
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() update = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<number>();

  toggleComplete() {
    this.update.emit({ ...this.task, completed: !this.task.completed });
  }
}
