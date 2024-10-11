import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { VflowComponent } from './v-flow/v-flow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VflowComponent],
  template: `
    <app-vflow></app-vflow>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
