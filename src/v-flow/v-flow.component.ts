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
  ImageBackground,
} from "ngx-vflow";
import { GrafenHauserComponent } from "../background-svg/grafenhauser-svg.component";
import { darmstadtElements } from "../darmstadt-data";
import { ScopeNodeComponent } from "./scope-node/scope-node.component";
import { FeatureModel } from "../model/feature.model";
import { mockDarmstadtData } from "../mock-data";
import * as turf from "@turf/turf";
import { ScopeEdgeFlowComponent } from "./scope-edge/scope-edge.component";
import { CustomSvgComponent } from "../background-svg/custom-svg/custom-svg.component";
import { color } from "d3";
@Component({
  selector: "app-vflow",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VflowModule,
    GrafenHauserComponent,
    ScopeEdgeFlowComponent,
    ScopeNodeComponent,
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

  background: Background = {
    type: "solid",
    color: "transparent",
  };
  imgBackground: ImageBackground = {
    type: "image",
    src: "src/assets/angle-right.svg",
    scale: 0.05,
  };

  connectionSetting: ConnectionSettings = {
    mode: "loose",
  };

  //Width and height of the container
  height = 1069;
  width = 1220;
  // Map extent for case Darmstadt
  mapExtent = {
    left: 8.634022529410913, // Longitude for top-left corner
    bottom: 49.8835094952137, // Latitude for bottom-right corner
    right: 8.638534952430376, // Longitude for bottom-right corner
    top: 49.88613737107883, // Latitude for top-left corner
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
    const { width, height } = this.calculateNodeSize(feature);
    return {
      id: feature.id,
      data: { feature },
      point: { x: xPixel - width / 1.75, y: yPixel - height / 1.75 },
      draggable: this.isDraggable(),
      height: height,
      width: width,
      type: "html-template",
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
    console.log("SourceHandle", sourceHandle);
    console.log("Target", target);
    console.log("TargetHandle", targetHandle);
    //Find the source Feature
    const sourceFeature = this.mockData.find(
      (feature) => feature.id === source
    );

    //Find the source port
    const sourcePort = sourceFeature?.ports.find(
      (port) => port.id === sourceHandle
    );

    //Find the target Feature
    const targetFeature = this.mockData.find(
      (feature) => feature.id === target
    );
    //Find  the target port
    const targetPort = targetFeature?.ports.find(
      (port) => port.id === targetHandle
    );
    console.log("SourcePort", sourcePort);
    console.log("TargetPort", targetPort);
    if (!sourcePort || !targetPort) {
      return;
    }
    if (sourcePort.color !== targetPort.color) {
      console.log("Invalid connection");
      return;
    }
    this.edges = [
      ...this.edges,
      {
        id: `${source} ${sourceHandle} -> ${target} ${targetHandle}`,
        source,
        sourceHandle,
        target,
        targetHandle,
        curve: "bezier",
        type: "template",
        data: { color: sourcePort.color },
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

  //Calculate the width and height of the node
  private calculateNodeSize(feature: FeatureModel) {
    if (!feature.elements.myGeoJson) {
      return { width: 500, height: 500 };
    }

    const myGeoJson = feature.elements.myGeoJson;

    // Check if the GeoJSON type is "Feature"
    if (myGeoJson.type === "Feature") {
      const geometry = myGeoJson.geometry;

      // Ensure the geometry type is "Polygon"
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates[0]; // Access the first ring of the polygon

        // Extract all latitudes and longitudes
        const longitudes = coordinates.map((coord) => coord[0]); // X values (longitudes)
        const latitudes = coordinates.map((coord) => coord[1]); // Y values (latitudes)

        // Polygon bounding box
        const minPolygonLng = Math.min(...longitudes);
        const maxPolygonLng = Math.max(...longitudes);
        const minPolygonLat = Math.min(...latitudes);
        const maxPolygonLat = Math.max(...latitudes);
        console.log("Right:", this.mapExtent.right);
        // Calculate scaling factors
        const scaleX =
          this.width / (this.mapExtent.right - this.mapExtent.left); // Pixels per degree longitude
        const scaleY =
          this.height / (this.mapExtent.top - this.mapExtent.bottom); // Pixels per degree latitude

        // Calculate pixel dimensions of the polygon
        const pixelWidth = (maxPolygonLng - minPolygonLng) * scaleX;
        const pixelHeight = (maxPolygonLat - minPolygonLat) * scaleY;
        console.log("Feature:", feature.name);
        console.log("Calculated dimensions:", { pixelWidth, pixelHeight });
        return { width: pixelWidth, height: pixelHeight };
      }
    }

    return { width: 500, height: 500 };
  }

  //Calculate the coordinate of the feature in ngx-vflow
  private calculateCoordinate(feature: FeatureModel) {
    const [centroidX, centroidY] = this.calculatePolygonCentroid(feature);
    // Calculations
    const xPixel =
      ((centroidX - this.mapExtent.left) /
        (this.mapExtent.right - this.mapExtent.left)) *
      this.width;
    const yPixel =
      this.height -
      ((centroidY - this.mapExtent.bottom) /
        (this.mapExtent.top - this.mapExtent.bottom)) *
        this.height;
    console.log("Calculated coordinates:", { xPixel, yPixel });
    return { xPixel, yPixel };
  }

  private calculatePolygonCentroid(feature: FeatureModel): [number, number] {
    if (!feature.elements.myGeoJson) {
      return [0, 0]; // Return default if no GeoJSON
    }
    console.log("FeatureCentroid:", feature.name);
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
  @ViewChild("vflow") vflow!: VflowComponent;
  @ViewChild("svgBackground") svgBackground!: GrafenHauserComponent;
  ngAfterViewInit() {
    console.log("Vflow", this.vflow);
    // Attach the wheel event listener to the native element
    this.vflow.viewportChange$.forEach((viewport) => {
      this.svgBackground.zoom(viewport);
    });
  }
}
