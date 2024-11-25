import { Component, input } from "@angular/core";
import { ElementData } from "../model/element-data.model";
import { CustomSvgComponent } from "./custom-svg/custom-svg.component";
@Component({
  selector: "app-background-svg",
  standalone: true,
  template: `
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <

      <!-- Render the alexander-svg component within an SVG foreignObject -->
      <!-- <foreignObject x="0" y="0" width="100%" height="100%">
        <alexander-svg></alexander-svg>
      </foreignObject> -->

      @for(element of elements(); track $index) {

      <svg:g custom-element [element]="element"></svg:g>

      }
    </svg>
  `,
  styles: [
    `
      :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    `,
  ],
  imports: [CustomSvgComponent],
})
export class BackgroundSvgComponent {
  elements = input<ElementData[]>();
}
