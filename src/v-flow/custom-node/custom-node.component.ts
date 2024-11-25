import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  input,
} from "@angular/core";
import { CustomNodeComponent } from "ngx-vflow";
import { CustomSvgComponent } from "../../background-svg/custom-svg/custom-svg.component";
import { ElementData } from "../../model/element-data.model";
import { FeatureModel } from "../../model/feature.model";

@Component({
  selector: "custom-node ",
  standalone: true,
  imports: [CustomSvgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./custom-node.component.html",
  styleUrls: ["./custom-node.component.scss"],
})
export class CustomNodesComponent extends CustomNodeComponent {
  feature = input.required<FeatureModel>();

  //MyGeoJSON
  element = computed(() => this.feature().elements);
}
