import {
  Component,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
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
        transition: transform 0.1s ease-out; /* Smooth zooming */
      }
    `,
  ],
  standalone: true,
  imports: [CustomSvgComponent],
})
export class GrafenHauserComponent {
  @Input() elements: ElementData[] = [];

  private scale = 1;
  private readonly zoomFactor = 0.1;
  private readonly minScale = 0.1;
  private readonly maxScale = 5;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("wheel", ["$event"])
  onWheel(event: WheelEvent): void {
    event.preventDefault();

    const svgElement = this.el.nativeElement.querySelector("svg");

    // Get mouse position relative to the SVG
    const rect = svgElement.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;

    // Adjust zoom scale
    if (event.deltaY < 0) {
      this.scale += this.zoomFactor; // Zoom in
    } else {
      this.scale -= this.zoomFactor; // Zoom out
    }

    // Clamp scale to min/max values
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale));

    // Apply scaling and set transform-origin dynamically
    this.renderer.setStyle(svgElement, "transform", `scale(${this.scale})`);
    this.renderer.setStyle(
      svgElement,
      "transform-origin",
      `${mouseX * 100}% ${mouseY * 100}%`
    );
  }
}
