import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <div class="task-detail" *ngIf="task; else notFound">
      <h2>Task Details: {{ task.title }}</h2>
      <p><strong>Status:</strong> <span [class.completed]="task.completed">{{ task.completed ? 'Completed' : 'Pending' }}</span></p>
      <p><strong>Priority:</strong> <span class="priority {{task.priority}}">{{ task.priority }}</span></p>
      <p><strong>Due Date:</strong> {{ task.dueDate | date:'mediumDate' }}</p>
      <p><strong>Description:</strong> {{ task.description || 'No description provided.' }}</p>
      <div *ngIf="task.tags?.length" class="tags">
        <strong>Tags:</strong>
        <span class="tag" *ngFor="let tag of task.tags">{{ tag }}</span>
      </div>
      
      <div class="actions">
        <button class="btn-back" (click)="goBack()">Back to Tasks</button>
      </div>
    </div>
    <ng-template #notFound>
      <div class="task-detail">
        <p>Task not found.</p>
        <button class="btn-back" (click)="goBack()">Back to Tasks</button>
      </div>
    </ng-template>
  `,
  styles: [`
    .task-detail { padding: 20px; border: 1px solid #eee; border-radius: 8px; margin: 20px 0; background: #fff;} 
    h2 { margin-top: 0; color: #333; }
    p { margin-bottom: 10px; }
    .completed { color: #4caf50; font-weight: bold; }
    .priority { padding: 3px 8px; border-radius: 12px; font-size: 0.85em; text-transform: capitalize; }
    .priority.high { background: #ffebee; color: #c62828; }
    .priority.medium { background: #fff3e0; color: #ef6c00; }
    .priority.low { background: #e8f5e9; color: #2e7d32; }
    .tags { margin-top: 15px; }
    .tag { display: inline-block; background: #e0e0e0; padding: 3px 8px; margin-left: 5px; border-radius: 4px; font-size: 0.85em; }
    .actions { margin-top: 20px; }
    .btn-back { padding: 8px 16px; cursor: pointer; background: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; }
    .btn-back:hover { background: #e0e0e0; }
  `]
})
export class TaskDetailComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
