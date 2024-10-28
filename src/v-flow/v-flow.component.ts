import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { DndDropEvent } from "ngx-drag-drop";
import {
  VflowModule,
  Node,
  Edge,
  ColorBackground,
  Connection,
  VflowComponent,
} from "ngx-vflow";

@Component({
  selector: "app-vflow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [VflowModule],
  templateUrl: "./v-flow.component.html",
  styleUrl: "./v-flow.component.scss",
})
export class SimpleVflowComponent {
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
