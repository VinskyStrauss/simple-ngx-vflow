import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewChild,
} from "@angular/core";
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
import { GrafenHauserComponent } from "../background-svg/grafenhauser-svg.component";
import { darmstadtElements } from "../darmstadt-data";
import { ScopeNodeComponent } from "./scope-node/scope-node.component";
import { FeatureModel } from "../model/feature.model";
import { mockDarmstadtData } from "../mock-data";
@Component({
  selector: "app-vflow",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VflowModule, BackgroundSvgComponent, GrafenHauserComponent],
  templateUrl: "./v-flow.component.html",
  styleUrl: "./v-flow.component.scss",
})
export class SimpleVflowComponent {
  //Vflow
  vflow = ViewChild(VflowComponent);
  //vFlow nodes
  vNodes = signal<Node[]>([]);
  readonly darmstadtElements = darmstadtElements;

  readonly mockData = mockDarmstadtData;

  backGround: Background = {
    type: "solid",
    color: "transparent",
  };

  connectionSetting: ConnectionSettings = {
    mode: "loose",
  };

  public nodes: Node[] = [
    // Map the nodes from the input data
    ...this.mockData.map((feature) => {
      console.log("Mapping feature to node:", feature); // Log the feature being processed
      const node = this.createNode(feature); // Create the node
      console.log("Created node:", node); // Log the created node
      return node;
    }),
  ];

  public edges: Edge[] = [];

  //Create Node
  public createNode(feature: FeatureModel): Node {
    return {
      id: crypto.randomUUID(),
      data: { feature },
      point: { x: 100, y: 100 },
      type: ScopeNodeComponent,
    };
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

  public connect({ source, sourceHandle, targetHandle, target }: Connection) {
    console.log("Connect");
    console.log("Source", source);
    console.log("Target", target);
    this.edges = [
      ...this.edges,
      {
        id: `${source} ${sourceHandle} -> ${target} ${targetHandle}`,
        source,
        sourceHandle,
        target,
        targetHandle,
        curve: "straight",
        type: "template",
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
