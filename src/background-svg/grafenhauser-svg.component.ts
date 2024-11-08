import { Component, input } from "@angular/core";
import { ElementData } from "../element-data.model";
import { CustomSvgComponent } from "./custom-svg/custom-svg.component";
import { AlexanderPlatzSvgComponent } from "./alexander-svg.component";
@Component({
  selector: "grafen-background-svg",
  standalone: true,
  template: `
    <img src="src/background-svg/assets/grafen.png" alt="Grafen Image" />
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
  imports: [CustomSvgComponent, AlexanderPlatzSvgComponent],
})
export class GrafenHauserComponent {
  imagePath = "./src/assets/grafen.png";
  elements = input<ElementData[]>();
}
