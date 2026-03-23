import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to the Angular 101 Task Manager.</p>
      <div class="metrics">
        <div class="metric-card">
          <h3>Total Tasks</h3>
          <p>Get an overview of your progress.</p>
        </div>
        <div class="metric-card">
          <h3>Recent Activity</h3>
          <p>See what has changed recently.</p>
        </div>
      </div>
      <div class="actions">
        <a routerLink="/tasks" class="btn btn-primary">View All Tasks</a>
        <a routerLink="/tasks/new" class="btn btn-secondary">Create New Task</a>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; } 
    h1 { color: #333; margin-bottom: 10px; }
    .metrics { display: flex; gap: 20px; margin: 20px 0; }
    .metric-card { flex: 1; padding: 20px; background: #f9f9f9; border-radius: 8px; border: 1px solid #eee; }
    .metric-card h3 { margin-top: 0; color: #555; }
    .actions { margin-top: 30px; display: flex; gap: 10px; }
    .btn { display: inline-block; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }
    .btn-primary { background: #00bcd4; color: white; }
    .btn-primary:hover { background: #0097a7; }
    .btn-secondary { background: #fff; color: #00bcd4; border: 1px solid #00bcd4; }
    .btn-secondary:hover { background: #e0f7fa; }
  `]
})
export class DashboardComponent {}
