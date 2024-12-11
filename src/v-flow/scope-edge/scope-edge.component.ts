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
    @let ctx = edgeContext(); @if (ctx) { @let color = ctx.edge.data.color;
    <ng-container>
      <svg:path
        selectable
        class="animate-path main-path"
        [attr.d]="ctx.path()"
        [attr.stroke]="color"
        [attr.marker-end]="ctx.markerEnd()"
        fill="none"
        stroke-width="5"
        tabindex="0"
        (keydown.backspace)="ctx.selected()"
      />
      <svg:path
        selectable
        class="animate-path moving-stroke"
        [attr.d]="ctx.path()"
        stroke="white"
        fill="none"
        stroke-width="3"
        [attr.stroke-dasharray]="ctx.strokeDasharray || '100'"
        [attr.stroke-dashoffset]="ctx.strokeDashoffset || '200'"
        tabindex="-1"
      />
    </ng-container>

    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: `
    /* Style for the main path based on color */
    .main-path {
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Animated moving white stroke */
    .moving-stroke {
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 100; /* Matches the length of the path */
      stroke-dashoffset: 200; /* Initially offset */
      animation: move-white-stroke 2s linear infinite;
    }

    @keyframes move-white-stroke {
      to {
        stroke-dashoffset: 0; /* Move the stroke along the path */
      }
    }
    `,
})
export class ScopeEdgeFlowComponent implements OnInit {
  edgeContext = input<any>();
  ngOnInit(): void {
    console.log("Edge initialized", this.edgeContext());
    console.log("Color", this.edgeContext().edge.data.color);
  }
}
