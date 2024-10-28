import { Component, input } from "@angular/core";
import { ElementData } from "../element-data.model";
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
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style="stop-color:rgb(255,255,0);stop-opacity:0.1"
          />
          <stop
            offset="100%"
            style="stop-color:rgb(255,0,0);stop-opacity:0.1"
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
      <circle
        cx="500"
        cy="500"
        r="400"
        stroke="white"
        stroke-width="2"
        fill="none"
      />
      <path
        d="M500,100 Q800,500 500,900 Q200,500 500,100"
        stroke="white"
        stroke-width="2"
        fill="none"
      />

      @for(element of elements(); track $index) {

      <svg:g my-element [element]="element"></svg:g>

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
