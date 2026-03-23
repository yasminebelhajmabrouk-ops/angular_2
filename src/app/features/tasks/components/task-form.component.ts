import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="task-form">
      <h2>Create a New Task</h2>
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" novalidate>
        <label>Title *</label>
        <input formControlName="title" type="text" />
        <div class="errors" *ngIf="title.invalid && title.touched">
          <small *ngIf="title.errors?.['required']">Title is required.</small>
          <small *ngIf="title.errors?.['minlength']">Minimum 3 chars.</small>
        </div>

        <label>Description</label>
        <textarea formControlName="description"></textarea>

        <label>Priority *</label>
        <select formControlName="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Due Date *</label>
        <input type="date" formControlName="dueDate" />
        <div class="errors" *ngIf="dueDate.invalid && dueDate.touched">
          <small *ngIf="dueDate.errors?.['required']">Due date is required.</small>
          <small *ngIf="dueDate.errors?.['pastDate']">Due date must be in the future.</small>
        </div>

        <div formArrayName="tags">
          <h4>Tags</h4>
          <div *ngFor="let ctrl of tags.controls; index as i" class="tag-row">
            <input [formControlName]="i" placeholder="Tag" />
            <button type="button" (click)="removeTag(i)">Remove</button>
          </div>
          <button type="button" (click)="addTag()">Add Tag</button>
        </div>

        <button type="submit" [disabled]="taskForm.invalid">Save Task</button>
        <button type="button" (click)="navigateToList()">Cancel</button>
      </form>
    </main>
  `,
  styles: [
    '.task-form { max-width: 600px; margin: 0 auto; }',
    'label { display:block; margin-top: 10px; }',
    'input, textarea, select { width: 100%; padding: 8px; margin-top: 4px; }',
    '.errors { color: #d32f2f; font-size: 0.85em; }',
    '.tag-row { display:flex; gap:8px; margin-bottom:6px; }'
  ]
})

export class TaskFormComponent {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: ['medium', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
      tags: this.fb.array([])
    });
  }

  get title() {
    return this.taskForm.get('title')!;
  }

  get dueDate() {
    return this.taskForm.get('dueDate')!;
  }

  get tags(): FormArray {
    return this.taskForm.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  futureDateValidator(control: AbstractControl) {
    const value = control.value as string | null;
    if (!value) {
      return null;
    }
    const date = new Date(value);
    return date > new Date() ? null : { pastDate: true };
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const raw = this.taskForm.value as {
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high';
      dueDate: string;
      tags: string[];
    };

    const task: Omit<Task, 'id'> = {
      title: raw.title ?? '',
      description: raw.description ?? '',
      priority: raw.priority ?? 'medium',
      dueDate: new Date(raw.dueDate ?? new Date().toISOString()).toISOString(),
      completed: false,
      tags: (raw.tags ?? []).filter(tag => !!tag?.trim()).map(tag => tag.trim())
    };

    this.taskService.addTask(task);
    this.router.navigate(['/']);
  }

  navigateToList() {
    this.router.navigate(['/']);
  }
}

