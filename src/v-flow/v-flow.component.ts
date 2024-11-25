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
  ConnectionSettings,
} from "ngx-vflow";
import { BackgroundSvgComponent } from "../background-svg/background-svg.component";
import { myElements } from "../data-example";
import { GrafenHauserComponent } from "../background-svg/grafenhauser-svg.component";
import { darmstadtElements } from "../darmstadt-data";
import { CustomNodesComponent } from "./custom-node/custom-node.component";
@Component({
  selector: "app-vflow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [VflowModule, BackgroundSvgComponent, GrafenHauserComponent],
  templateUrl: "./v-flow.component.html",
  styleUrl: "./v-flow.component.scss",
})
export class SimpleVflowComponent {
  //Vflow
  vflow = ViewChild(VflowComponent);

  readonly myElements = myElements;
  readonly darmstadtElements = darmstadtElements;

  backGround: Background = {
    type: "solid",
    color: "transparent",
  };

  connectionSetting: ConnectionSettings = {
    mode: "loose",
  };
  public nodes: Node[] = [];

  public edges: Edge[] = [];

  //Create Node
  public createNode({ event }: DndDropEvent) {
    const point = {
      x: event.x,
      y: event.y,
    };

    this.nodes = [
      ...this.nodes,
      {
        id: crypto.randomUUID(),
        point,
        type: CustomNodesComponent,
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

  //Delete Connection
  public deleteEdge(edge: Edge) {
    console.log("Edge", edge);
    this.edges = this.edges.filter((e) => e.id !== edge.id);
  }

  public connect({ source, target }: Connection) {
    console.log("Connect", source, target);
    this.edges = [
      ...this.edges,
      {
        id: `${source} -> ${target}`,
        source,
        target,
        curve: "straight",
        markers: {
          end: {
            type: "arrow-closed",
            width: 30,
            height: 30,
            color: "#000000",
          },
        },
      },
    ];
  }
}
