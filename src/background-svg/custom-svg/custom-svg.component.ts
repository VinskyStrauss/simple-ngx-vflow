import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
} from "@angular/core";
import { ElementData } from "../../element-data.model";
import { GeoJSON2SVG } from "geojson2svg";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "svg:g[custom-element]",
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
      :host { 
          display: contents
      }
    `,
  host: {
    "[innerHTML]": "mySvg()",
  },
})
export class CustomSvgComponent {
  element = input.required<ElementData>();
  private sanitizer = inject(DomSanitizer);

  converter = new GeoJSON2SVG({
    mapExtent: { left: -180, bottom: -90, right: 180, top: 90 },
    viewportSize: { width: 1000, height: 1000 },
    // attributes: ["properties.class", "properties.foo"],
    r: 10,
  });

  myGeoJson = computed<GeoJSON.GeoJSON | GeoJSON.GeometryCollection>(
    () => this.element().myGeoJson
  );

  mySvg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      this.converter.convert(this.myGeoJson()).join("")
    )
  );
}
