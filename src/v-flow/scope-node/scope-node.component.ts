import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  input,
  Signal,
} from "@angular/core";
import { CustomNodeComponent } from "ngx-vflow";
import { CustomSvgComponent } from "../../background-svg/custom-svg/custom-svg.component";
import { ElementData } from "../../model/element-data.model";
import { FeatureModel } from "../../model/feature.model";
import { Port } from "../../model/port.model";
import { ScopeNodeVPortComponent } from "./scope-node-port/scope-node-port.component";

interface ScopeNodeData {
  feature: FeatureModel;
}

@Component({
  selector: "custom-node ",
  standalone: true,
  imports: [CustomSvgComponent, ScopeNodeVPortComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./scope-node.component.html",
  styleUrls: ["./scope-node.component.scss"],
})
export class ScopeNodeComponent extends CustomNodeComponent<ScopeNodeData> {
  //Retrieve the data, so we can use it in html
  name = computed(() => this.data()?.feature?.name);

  //Get tge port
  ports: Signal<Port[] | undefined> = computed(
    () => this.data()?.feature?.ports
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
