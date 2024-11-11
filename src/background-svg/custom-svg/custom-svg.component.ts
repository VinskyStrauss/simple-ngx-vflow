import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  Input,
} from "@angular/core";
import { ElementData } from "../../element-data.model";
import { GeoJSON2SVG } from "geojson2svg";
import { DomSanitizer } from "@angular/platform-browser";
import reproject from "reproject";
import proj4 from "proj4";

@Component({
  selector: "svg:g[custom-element]",
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
      :host { 
          display: contents;
      }
    `,
  host: {
    "[innerHTML]": "mySvg()",
  },
})
export class CustomSvgComponent {
  @Input() element!: ElementData; // Assume ElementData includes myGeoJson property
  private sanitizer = inject(DomSanitizer);

  //Converter for the darmstadt grafenhauser map
  darmstadtConverter = new GeoJSON2SVG({
    viewportSize: { width: 1220, height: 1069 },
    mapExtentFromGeojson: true,
    explode: true,
    r: 10,
  });

  // Reactive accessor for GeoJSON data
  myGeoJson = computed(() => this.element.myGeoJson);

  // Generate SVG path data from GeoJSON and render it as SVG
  mySvg = computed(() => {
    console.log(this.myGeoJson());
    //Transforming the GeoJson coordinates to pixel coordinates
    const myGeoJSON = this.myGeoJson() as any;
    //Create a reproject, to convert he coordinates to other coordinates
    const reprojected = reproject.reproject(
      this.myGeoJson(),
      "EPSG:4326",
      "EPSG:3857",
      proj4.defs
    );
    console.log("Reprojected", reprojected);
    const svgPaths = this.darmstadtConverter.convert(reprojected);
    console.log("SVGPaths", svgPaths);

    // Sanitizing the SVG paths
    const sanitizedPath = this.sanitizer.bypassSecurityTrustHtml(
      svgPaths.join("")
    );
    return sanitizedPath;
  });
}
