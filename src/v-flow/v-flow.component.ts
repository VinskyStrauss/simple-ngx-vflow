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
  NodePositionChange,
} from "ngx-vflow";
import { GrafenHauserComponent } from "../background-svg/grafenhauser-svg.component";
import { darmstadtElements } from "../darmstadt-data";
import { ScopeNodeComponent } from "./scope-node/scope-node.component";
import { ElementModel } from "../model/element.model";
import { mockDarmstadtData } from "../mock-data";
import * as turf from "@turf/turf";
import { ScopeEdgeFlowComponent } from "./scope-edge/scope-edge.component";
import { CustomSvgComponent } from "../background-svg/custom-svg/custom-svg.component";
import { color } from "d3";
import { PortTypeColors } from "../model/port-type.model";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
@Component({
  selector: "app-vflow",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VflowModule,
    GrafenHauserComponent,
    ScopeEdgeFlowComponent,
    ScopeNodeComponent,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: "./v-flow.component.html",
  styleUrl: "./v-flow.component.scss",
})
export class SimpleVflowComponent implements AfterViewInit {
  //vFlow nodes
  vNodes = signal<Node[]>([]);
  private nodePositions: { [key: string]: { x: number; y: number } } = {};
  readonly darmstadtElements = darmstadtElements;

  readonly mockData = mockDarmstadtData;

  //Dragggable
  isDraggable = signal<boolean>(false);
  isInitialized = false;
  resourceEffect = effect(() => {
    console.log("Resource Effect");
    //Create the nodes and put it in the vNodes
    this.vNodes.set(
      this.mockData.map((element) => {
        const node = this.createNode(element);
        return node;
      })
    );
    this.isInitialized = true;
    this.isDraggable();
  });

  toggleDraggable() {
    this.isDraggable.set(!this.isDraggable());
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

  public edges: Edge[] = [];

  //Create Node
  public createNode(element: ElementModel): Node {
    const { xPixel, yPixel } = this.calculateCoordinate(element);
    const { width, height } = this.calculateNodeSize(element);
    let { translateX, translateY } = { translateX: 0, translateY: 0 };
    if (width < 100) {
      translateX = width / 2;
      translateY = height / 2;
    } else {
      translateX = width / 1.75;
      translateY = height / 1.75;
    }

    // Use stored position if available
    const position = this.nodePositions[element.id] || {
      x: xPixel - translateX,
      y: yPixel - translateY,
    };

    return {
      id: element.id,
      data: { element },
      point: position,
      draggable: this.isDraggable(),
      height: height,
      width: width,
      type: "html-template",
    };
  }

  // Node Position Change
  public nodeChange(nodeChanges: NodePositionChange[]) {
    console.log("Node Changes:", nodeChanges);

    nodeChanges.forEach((change) => {
      const node = this.vNodes().find((node) => node.id === change.id);

      if (node) {
        if (change.point) {
          node.point = change.point;
          // Store the new position
          this.nodePositions[change.id] = {
            x: change.point.x,
            y: change.point.y,
          };
        }

        console.log("Updated Node:", node);
      } else {
        console.warn(`Node with ID ${change.id} not found`);
      }
    });

    this.vNodes.set([...this.vNodes()]);
  }

  //Delete Node
  public deleteNode({ id }: Node) {
    this.vNodes.set(this.vNodes().filter((node) => node.id !== id));
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
    if (!sourcePort || !targetPort) {
      return;
    }
    if (sourcePort.type !== targetPort.type) {
      console.error("Invalid connection");
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
        data: { color: PortTypeColors[sourcePort.type] },
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

  //Calculate the width and height of the node
  private calculateNodeSize(feature: ElementModel) {
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
        // Calculate scaling factors
        const scaleX =
          this.width / (this.mapExtent.right - this.mapExtent.left); // Pixels per degree longitude
        const scaleY =
          this.height / (this.mapExtent.top - this.mapExtent.bottom); // Pixels per degree latitude

        // Calculate pixel dimensions of the polygon
        const pixelWidth = (maxPolygonLng - minPolygonLng) * scaleX;
        const pixelHeight = (maxPolygonLat - minPolygonLat) * scaleY;

        return { width: pixelWidth, height: pixelHeight };
      }
    }

    return { width: 500, height: 500 };
  }

  //Calculate the coordinate of the feature in ngx-vflow
  private calculateCoordinate(feature: ElementModel) {
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

    return { xPixel, yPixel };
  }

  private calculatePolygonCentroid(feature: ElementModel): [number, number] {
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
