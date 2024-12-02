import { Component, OnInit } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { SimpleVflowComponent } from "./v-flow/v-flow.component";
import { mockDarmstadtData } from "./mock-data";

@Component({
  selector: "app-root",
  imports: [SimpleVflowComponent],
  template: `
    <div class="page">
      <h1>Ngx-vflow with GeoJSON</h1>
      <div>
        <app-vflow></app-vflow>
      </div>
    </div>
  `,
  styles: `
  .vflow-container {
    width: 100%;
  }
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`,
})
export class App implements OnInit {
  ngOnInit(): void {
    console.log("App initialized");
    console.log("Mock data:", this.mockData);
  }
  readonly mockData = mockDarmstadtData;
}

bootstrapApplication(App);
