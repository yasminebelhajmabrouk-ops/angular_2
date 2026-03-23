import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  template: `
    <div class="reports">
      <h1>Reports</h1>
      <p>Task analytics and reports will appear here in the future.</p>
      
      <div class="placeholder-chart">
        <div class="bar" style="height: 60%;" title="Completed"></div>
        <div class="bar" style="height: 30%;" title="Pending"></div>
        <div class="bar" style="height: 10%;" title="Overdue"></div>
      </div>
    </div>
  `,
  styles: [`
    .reports { padding: 20px; }
    h1 { color: #333; }
    .placeholder-chart { display: flex; align-items: flex-end; gap: 20px; height: 200px; padding: 20px; background: #f9f9f9; margin-top: 30px; border-radius: 8px; }
    .bar { width: 60px; background: #00bcd4; border-radius: 4px 4px 0 0; }
    .bar:nth-child(2) { background: #ff9800; }
    .bar:nth-child(3) { background: #f44336; }
  `]
})
export class ReportsComponent {}
