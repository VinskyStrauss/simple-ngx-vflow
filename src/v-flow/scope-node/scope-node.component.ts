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

interface ScopeNodeData {
  feature: FeatureModel;
}

@Component({
  selector: "custom-node ",
  standalone: true,
  imports: [CustomSvgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <!-- <svg>
        <svg:g custom-element [element]="element()"></svg:g>
      </svg> -->
      <span>{{ data()?.feature?.name }}</span>
    </div>
  `,
  styleUrls: ["./scope-node.component.scss"],
})
export class ScopeNodeComponent extends CustomNodeComponent<ScopeNodeData> {
  //Retrieve the data, so we can use it in html
}
