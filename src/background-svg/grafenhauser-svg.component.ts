import { Component, input } from "@angular/core";
import { ElementData } from "../model/element-data.model";
import { CustomSvgComponent } from "./custom-svg/custom-svg.component";
@Component({
  selector: "grafen-background-svg",
  template: `
    <svg
      viewBox="0 0 1220 1069"
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href="assets/grafen.png" alt="Grafen" class="grafen-image" />
      <!-- @for(element of elements(); track $index) {

      <svg:g custom-element [element]="element"></svg:g>

      } -->
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
  standalone: true,
  imports: [CustomSvgComponent],
})
export class GrafenHauserComponent {
  imagePath = "./src/assets/grafen.png";
  elements = input<ElementData[]>();
}
