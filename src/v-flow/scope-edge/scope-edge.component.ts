import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from "@angular/core";

@Component({
  selector: "svg:g[eta-edge]",
  template: `
    @let ctx = edgeContext(); @if (ctx) {
    <ng-container>
      <svg:path
        selectable
        class="without-tab-index"
        [attr.d]="ctx.path()"
        [attr.stroke]="ctx.selected() ? '#0f4c75' : '#bbe1fa'"
        [attr.marker-end]="ctx.markerEnd()"
        fill="none"
        stroke-width="5"
        tabindex="0"
        (keydown.backspace)="ctx.selected()"
      />
    </ng-container>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: `
      .animate-path {
        stroke-dasharray: 100; /* High value to ensure the dash covers the entire path */
        stroke-dashoffset: 200; /* Initially, the path is not visible */
        animation: draw-path 2s linear infinite; /* 2-second animation to draw the path */
      }
  
      @keyframes draw-path {
        to {
          stroke-dashoffset: 0; /* Animate to 0 to make the path visible from start to end */
        }
      }
    `,
})
export class ScopeEdgeFlowComponent implements OnInit {
  edgeContext = input<any>();
  ngOnInit(): void {
    console.log("Edge initialized", this.edgeContext());
  }
}
