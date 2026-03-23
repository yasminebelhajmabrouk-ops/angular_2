import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { TaskCardComponent } from './task-card.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, AsyncPipe, TaskCardComponent],
  template: `
    <section>
      <div class="toolbar">
        <label>Filter:
          <select [value]="statusFilter.value" (change)="statusFilter.next($any($event.target).value)">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <span *ngIf="error" class="error">{{ error }}</span>
      </div>

      <ng-container *ngIf="filteredTasks$ | async as tasks; else loading">
        <app-task-card
          *ngFor="let task of tasks; trackBy: trackById"
          [task]="task"
          (update)="onUpdate($event)"
          (remove)="onDelete($event)"
        ></app-task-card>
        <p *ngIf="tasks.length === 0">No tasks found.</p>
      </ng-container>

      <ng-template #loading>
        <p>Loading tasks...</p>
      </ng-template>
    </section>
  `,
  styles: [
    '.toolbar { margin-bottom: 12px; display:flex; align-items:center; gap:12px; }',
    '.error { color: #b00020; }'
  ]
})
export class TaskListComponent {
  statusFilter = new BehaviorSubject<string>('');
  error = '';
  filteredTasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.filteredTasks$ = combineLatest([this.taskService.tasks$, this.statusFilter]).pipe(
      map(([tasks, status]) => {
        if (!status) return tasks;
        const completed = status === 'completed';
        return tasks.filter(t => t.completed === completed);
      })
    );
  }

  onUpdate(task: Task) {
    this.taskService.updateTask(task);
  }

  onDelete(id: number) {
    this.taskService.deleteTask(id);
  }

  trackById(_: number, task: Task) {
    return task.id;
  }
}
