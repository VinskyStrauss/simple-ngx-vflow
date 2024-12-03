import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
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
  NodeChange,
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

  //Dragggable
  isDraggable = signal<boolean>(false);

  toggleDraggable() {
    this.isDraggable.set(!this.isDraggable());
    this.nodes.forEach((node) => {
      node.draggable = this.isDraggable();
    });
    console.log("Draggable", this.isDraggable());
  }

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
    //Calculate the coordinate of the feature
    const { xPixel, yPixel } = this.calculateCoordinate(feature);
    return {
      id: feature.id,
      data: { feature },
      point: { x: xPixel - 100, y: yPixel - 100 },
      draggable: this.isDraggable(),
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

  //Console.log the position change
  public onPositionChange(changes: NodeChange[]) {
    console.log("Position change", changes);
  }

  //Calculate the coordinate of the feature in ngx-vflow
  private calculateCoordinate(feature: FeatureModel) {
    const height = 1069;
    const width = 1220;
    // Map extent for case Darmstadt
    const mapExtent = {
      left: 8.634022529410913, // Longitude for top-left corner
      bottom: 49.8835094952137, // Latitude for bottom-right corner
      right: 8.638534952430376, // Longitude for bottom-right corner
      top: 49.88613737107883, // Latitude for top-left corner
    };
    const [centroidX, centroidY] = this.calculatePolygonCentroid(feature);
    // Calculations
    const xPixel =
      ((centroidX - mapExtent.left) / (mapExtent.right - mapExtent.left)) *
      width;
    const yPixel =
      height -
      ((centroidY - mapExtent.bottom) / (mapExtent.top - mapExtent.bottom)) *
        height;
    console.log("Calculated coordinates:", { xPixel, yPixel });
    return { xPixel, yPixel };
  }

  //Calculate the centroid of the polygon
  private calculatePolygonCentroid(feature: FeatureModel): [number, number] {
    let xSum = 0;
    let ySum = 0;
    let area = 0;

    if (!feature.elements.myGeoJson) {
      return [0, 0]; // Return default if no GeoJSON
    }

    // Check if the GeoJSON type is "Feature"
    if (feature.elements.myGeoJson.type === "Feature") {
      const geometry = feature.elements.myGeoJson.geometry;

      // Ensure the geometry type is "Polygon"
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates[0]; // First set of coordinates for the polygon
        const vertexCount = coordinates.length;

        // Ensure the polygon is closed
        if (
          coordinates[0][0] !== coordinates[vertexCount - 1][0] ||
          coordinates[0][1] !== coordinates[vertexCount - 1][1]
        ) {
          coordinates.push(coordinates[0]); // Close the polygon if necessary
        }

        for (let i = 0; i < coordinates.length - 1; i++) {
          const [x1, y1] = coordinates[i];
          const [x2, y2] = coordinates[i + 1];

          const partialArea = x1 * y2 - x2 * y1;

          xSum += (x1 + x2) * partialArea;
          ySum += (y1 + y2) * partialArea;
          area += partialArea;
        }

        area *= 0.5;

        const centroidX = xSum / (6 * area);
        const centroidY = ySum / (6 * area);

        console.log("Calculated centroid:", { centroidX, centroidY });

        return [centroidX, centroidY];
      }
    }

    return [0, 0]; // Default return in case of invalid input
  }
  onMouseWheel(event: WheelEvent): void {
    console.log("Mouse wheel event", event);
  }
}
