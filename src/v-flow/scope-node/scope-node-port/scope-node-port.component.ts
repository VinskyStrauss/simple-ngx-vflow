import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { VflowModule } from "ngx-vflow";
import { fromEvent, take } from "rxjs";
import { Port } from "../../../model/port.model";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "eta-scope-node-ports",
  templateUrl: "./scope-node-port.component.html",
  styleUrls: ["./scope-node-port.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VflowModule, MatTooltipModule],
})
export class ScopeNodeVPortComponent {
  nodePorts = input<Port[]>();
  editMode = input<boolean>();
  position = input<"top" | "left" | "right">("left");
  destroyRef = inject(DestroyRef);

  handleClicked = signal(false);

  onHandleMouseDown(): void {
    this.handleClicked.set(true);
    // When handle clicked, listen body mouseup to send handle click
    fromEvent(window.document.body, "mouseup")
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.handleClicked.set(false));
  }
}
