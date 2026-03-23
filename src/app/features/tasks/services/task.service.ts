import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Setup project',
      description: 'Initialize repo and install dependencies',
      priority: 'high',
      dueDate: new Date().toISOString(),
      completed: false,
      tags: ['setup', 'core']
    },
    {
      id: 2,
      title: 'Create task model',
      description: 'Define Task interface and base services',
      priority: 'medium',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      tags: ['model']
    }
  ]);

  readonly tasks$ = this.tasksSubject.asObservable();

  readonly pendingTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.completed))
  );

  getTasks(): Task[] {
    return [...this.tasksSubject.getValue()];
  }

  getTaskById(id: number): Task | undefined {
    return this.tasksSubject.getValue().find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = { ...task, id: Date.now() };
    this.tasksSubject.next([...this.tasksSubject.getValue(), newTask]);
  }

  updateTask(updated: Task): void {
    this.tasksSubject.next(
      this.tasksSubject.getValue().map(t => (t.id === updated.id ? updated : t))
    );
  }

  deleteTask(id: number): void {
    this.tasksSubject.next(this.tasksSubject.getValue().filter(t => t.id !== id));
  }
}
