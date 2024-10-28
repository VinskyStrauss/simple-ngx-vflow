import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { DndDropEvent, DndModule } from "ngx-drag-drop";
import {
  VflowModule,
  Node,
  Edge,
  ColorBackground,
  Connection,
  VflowComponent,
  Background,
} from "ngx-vflow";
import { BackgroundSvgComponent } from "../background-svg/background-svg.component";
import { myElements } from "../data-example";
@Component({
  selector: "app-vflow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [VflowModule, DndModule, BackgroundSvgComponent],
  templateUrl: "./v-flow.component.html",
  styleUrl: "./v-flow.component.scss",
})
export class SimpleVflowComponent {
  //Vflow
  vflow = ViewChild(VflowComponent);

  readonly myElements = myElements;

  backGround: Background = {
    type: "solid",
    color: "transparent",
  };
  public nodes: Node[] = [
    {
      id: crypto.randomUUID(),
      point: { x: 10, y: 200 },
      type: "html-template",
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

  //Create Node
  public createNode({ event }: DndDropEvent) {
    console.log("Event", event);
    const point = {
      x: event.x,
      y: event.y,
    };

    this.nodes = [
      ...this.nodes,
      {
        id: crypto.randomUUID(),
        point,
        type: "html-template",
      },
    ];
  }

  //Delete Node
  public deleteNode({ id }: Node) {
    this.nodes = this.nodes.filter((node) => node.id !== id);
    this.edges = this.edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    );
  }

  public connect({ source, target }: Connection) {
    this.edges = [
      ...this.edges,
      {
        id: `${source} -> ${target}`,
        source,
        target,
        markers: {
          end: {
            type: "arrow-closed",
            width: 30,
            height: 30,
            color: "#ffeeaa",
          },
        },
      },
    ];
  }
}
