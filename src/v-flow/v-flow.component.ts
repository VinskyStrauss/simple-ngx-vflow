import { ChangeDetectionStrategy, Component } from "@angular/core";
import { VflowModule, Node, Edge, ColorBackground } from "ngx-vflow";

@Component({
  selector: "app-vflow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [VflowModule],
  template: `
    <div class="vflow-container">
      <vflow
        [nodes]="nodes"
        [edges]="edges"
        [background]="solidBackground"
        view="auto"
      >
      </vflow>
    </div>
  `,
  styles: [
    `
      .vflow-container {
        width: 100%;
        height: 500px;
      }
    `,
  ],
})
export class VflowComponent {
  solidBackground: ColorBackground = {
    type: "solid",
    color: "transparent",
  };
  public nodes: Node[] = [
    {
      id: "1",
      point: { x: 10, y: 200 },
      type: "default",
      text: "1",
    },
    {
      id: "2",
      point: { x: 200, y: 100 },
      type: "default",
      text: "2",
    },
    {
      id: "3",
      point: { x: 200, y: 300 },
      type: "default",
      text: "3",
    },
  ];

  public edges: Edge[] = [
    {
      id: "1 -> 2",
      source: "1",
      target: "2",
      curve: "straight",
    },
    {
      id: "1 -> 3",
      source: "1",
      target: "3",
      curve: "straight",
    },
  ];
}
