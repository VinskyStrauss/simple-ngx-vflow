import {
  Component,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
  input,
} from "@angular/core";
import { ElementData } from "../model/element-data.model";
import { CustomSvgComponent } from "./custom-svg/custom-svg.component";

@Component({
  selector: "grafen-background-svg",
  template: `
    <svg
      #svgElement
      viewBox="0 0 1220 1069"
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href="assets/grafen.png" alt="Grafen" class="grafen-image" />
      <!--       @for(element of elements(); track $index) {

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
        overflow: hidden;
        pointer-events: auto;
      }
      svg {
        display: block;
      }
    `,
  ],
  standalone: true,
  imports: [CustomSvgComponent],
})
export class GrafenHauserComponent {
  elements = input<ElementData[]>();

  private scale = 1;
  private readonly zoomFactor = 0.2;
  private readonly minScale = 0.2;
  private readonly maxScale = 5;

  constructor(public el: ElementRef, private renderer: Renderer2) {}

  zoom(viewPort: any): void {
    console.log("Zooming", viewPort);
    const svgElement = this.el.nativeElement.querySelector("svg");

    // Get mouse position relative to the SVG
    const { x, y, zoom } = viewPort;
    // Set transform to scale the SVG based on the ngx-vflow zoom
    this.renderer.setStyle(
      svgElement,
      "transform",
      `translate(${x}px, ${y}px) scale(${zoom})`
    );
    this.renderer.setStyle(svgElement, "transform-origin", `0 0`); // Anchor at the top-left corner
  }
}
