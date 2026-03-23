import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly apiUrl = 'https://api.example.com/tasks';

  constructor(private http: HttpClient) {}

  getTasks(filters?: { status?: string; priority?: string }): Observable<Task[]> {
    let params = new HttpParams();
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.priority) params = params.set('priority', filters.priority);

    return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
      retry({ count: 2, delay: 1000 }),
      tap(tasks => console.log(`Loaded ${tasks.length} tasks`)),
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(created => console.log('Created task:', created.id)),
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  patchTask(id: number, changes: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, changes);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Deleted task:', id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred';
    if (error.status === 0) message = 'Network error - check your connection';
    else if (error.status === 401) message = 'Unauthorized - please log in';
    else if (error.status === 403) message = 'Forbidden - insufficient permissions';
    else if (error.status === 404) message = 'Resource not found';
    else if (error.status >= 500) message = 'Server error - try again later';
    return throwError(() => new Error(message));
  }
}
