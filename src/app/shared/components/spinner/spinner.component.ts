import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `<div class="spinner">Loading...</div>`,
  styles: [`.spinner { font-weight: bold; color: #00bcd4; padding: 20px; text-align: center; }`]
})
export class SpinnerComponent {}
