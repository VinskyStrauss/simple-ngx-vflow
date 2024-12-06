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
import { FeatureModel } from "../../model/feature.model";
import { Port } from "../../model/port.model";
import { ScopeNodeVPortComponent } from "./scope-node-port/scope-node-port.component";

@Component({
  selector: "custom-node ",
  standalone: true,
  imports: [CustomSvgComponent, ScopeNodeVPortComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./scope-node.component.html",
  styleUrls: ["./scope-node.component.scss"],
})
export class ScopeNodeComponent {
  nodeContext = input<any>();

  //Retrieve the data, so we can use it in html
  name = computed(() => this.nodeContext().node.data.feature.name);

  //Node width and height
  width = computed(() => this.nodeContext().node.width);
  height = computed(() => this.nodeContext().node.height);
  //Get tge port
  ports: Signal<Port[] | undefined> = computed(
    () => this.nodeContext().node.data.feature.ports
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
