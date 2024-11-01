import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { SimpleVflowComponent } from "./v-flow/v-flow.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SimpleVflowComponent],
  template: `
    <h1>Ngx-vflow with GeoJSON</h1>
    <div class="vflow-container">
      <app-vflow></app-vflow>
    </div>
  `,
  styles: `
  .vflow-container {
    width: 100%;
  }
`,
})
export class App {
  name = "Angular";
}

bootstrapApplication(App);
