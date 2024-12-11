import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from "@angular/core";
import { FeatureModel } from "../../../model/feature.model";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "eta-scope-node-feature",
  templateUrl: "./scope-node-feature.component.html",
  styleUrls: ["./scope-node-feature.component.scss"],
  imports: [MatTableModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ScopeNodeFeatureComponent implements OnInit {
  displayedColumns: string[] = ["icon", "name", "unit"];
  featuresData = input<FeatureModel[]>([]);
  width = input<number>(200);
  ngOnInit(): void {
    console.log("Width", this.width());
    console.log("Features in Scope Features", this.featuresData());
  }
}
