import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  OnDestroy,
  signal,
  viewChild,
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
import * as turf from "@turf/turf";
import { ScopeEdgeFlowComponent } from "./scope-edge/scope-edge.component";
@Component({
  selector: "app-vflow",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VflowModule,
    BackgroundSvgComponent,
    GrafenHauserComponent,
    ScopeEdgeFlowComponent,
  ],
  templateUrl: "./v-flow.component.html",
  styleUrl: "./v-flow.component.scss",
})
export class SimpleVflowComponent implements AfterViewInit {
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
      height: 500,
      width: 500,
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

  private calculatePolygonCentroid(feature: FeatureModel): [number, number] {
    if (!feature.elements.myGeoJson) {
      return [0, 0]; // Return default if no GeoJSON
    }

    // Check if the GeoJSON type is "Feature"
    if (feature.elements.myGeoJson.type === "Feature") {
      const geometry = feature.elements.myGeoJson.geometry;

      // Ensure the geometry type is "Polygon"
      if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") {
        // Use turf.centroid to calculate the centroid
        const centroid = turf.centroid(feature.elements.myGeoJson);

        // Log the calculated centroid
        console.log("Calculated centroid:", centroid.geometry.coordinates);

        return centroid.geometry.coordinates as [number, number];
      }
    }
    return [0, 0]; // Return default if no valid polygon found
  }
  @ViewChild("vflowContainer", { static: false }) vflowContainer!: ElementRef; // Reference to the vflow container element
  @ViewChild("vflow") vflow!: VflowComponent;
  @ViewChild("svgBackground") svgBackground!: GrafenHauserComponent;
  ngAfterViewInit() {
    console.log("Vflow container:", this.vflowContainer);
    // Attach the wheel event listener to the native element
    this.vflow.viewportChange$.forEach((viewport) => {
      this.svgBackground.zoom(viewport);
    });
  }
}
