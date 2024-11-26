import { Component, OnInit } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { SimpleVflowComponent } from "./v-flow/v-flow.component";
import { mockDarmstadtData } from "./mock-data";

@Component({
    selector: "app-root",
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
`
})
export class App implements OnInit {
  ngOnInit(): void {
    console.log("App initialized");
    console.log("Mock data:", this.mockData);
  }
  readonly mockData = mockDarmstadtData;
}

bootstrapApplication(App);
