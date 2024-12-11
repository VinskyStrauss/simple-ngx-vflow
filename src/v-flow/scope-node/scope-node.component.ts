import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  input,
  OnInit,
  Signal,
} from "@angular/core";
import { CustomNodeComponent } from "ngx-vflow";
import { CustomSvgComponent } from "../../background-svg/custom-svg/custom-svg.component";
import { ElementData } from "../../model/element-data.model";
import { ElementModel } from "../../model/element.model";
import { Port } from "../../model/port.model";
import { ScopeNodeVPortComponent } from "./scope-node-port/scope-node-port.component";
import { ScopeNodeFeatureComponent } from "./scope-node-feature/scope-node-feature.component";

@Component({
  selector: "custom-node ",
  standalone: true,
  imports: [
    CustomSvgComponent,
    ScopeNodeVPortComponent,
    ScopeNodeFeatureComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./scope-node.component.html",
  styleUrls: ["./scope-node.component.scss"],
})
export class ScopeNodeComponent implements OnInit {
  nodeContext = input<any>();

  ngOnInit(): void {
    console.log("Node Context", this.nodeContext());
  }
  //Get the viewbox
  getViewBox(): string {
    return `0 0 ${this.width()} ${this.height()}`;
  }
  //Retrieve the data, so we can use it in html
  name = computed(() => this.nodeContext().node.data.feature.name);

  //Node width and height
  width = computed(() => this.nodeContext().node.width);
  height = computed(() => this.nodeContext().node.height);
  //Get tge port
  ports: Signal<Port[] | undefined> = computed(
    () => this.nodeContext().node.data.element.ports
  );

  leftPorts: Signal<Port[] | undefined> = computed(() =>
    this.ports()?.filter((port) => port.location === "left")
  );

  rightPorts: Signal<Port[] | undefined> = computed(() =>
    this.ports()?.filter((port) => port.location === "right")
  );

  topPorts: Signal<Port[] | undefined> = computed(() =>
    this.ports()?.filter((port) => port.location === "top")
  );
}
