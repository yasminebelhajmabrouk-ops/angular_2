import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`.empty-state { text-align: center; color: #888; padding: 2rem; border: 1px dashed #ccc; border-radius: 8px; }`]
})
export class EmptyStateComponent {
  @Input() message: string = 'No tasks found';
}
