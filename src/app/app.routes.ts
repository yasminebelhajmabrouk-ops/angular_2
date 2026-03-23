import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'tasks', loadComponent: () => import('./features/tasks/components/task-list.component').then(m => m.TaskListComponent) },
  { path: 'tasks/new', loadComponent: () => import('./features/tasks/components/task-form.component').then(m => m.TaskFormComponent) },
  { path: 'tasks/:id', loadComponent: () => import('./features/tasks/components/task-detail/task-detail.component').then(m => m.TaskDetailComponent) },
  { path: 'reports', loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
