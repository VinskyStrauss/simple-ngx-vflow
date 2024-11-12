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
import { toMercator, toWgs84 } from "@turf/projection";
import { svg } from "d3";

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
    mapExtent: {
      left: 8.634022529410913, // longitude for top-left corner
      bottom: 49.8835094952137, // latitude for bottom-right corner
      right: 8.638534952430376, // longitude for bottom-right corner
      top: 49.88613737107883, // latitude for top-left corner
    },
    viewportSize: { width: 1220, height: 1069 },
    r: 10,
  });

  // Reactive accessor for GeoJSON data
  myGeoJson = computed(() => this.element.myGeoJson);

  // Generate SVG path data from GeoJSON and render it as SVG
  mySvg = computed(() => {
    console.log(this.myGeoJson());
    //Transforming the GeoJson coordinates to pixel coordinates
    const myGeoJSON = this.myGeoJson() as any;

    //Use reproject
    // covert wgs84 data to Web Mercator projection
    const geojson3857 = reproject.reproject(
      myGeoJSON,
      "EPSG:4326",
      "EPSG:3857",
      proj4.defs
    );
    console.log("Reprojected", geojson3857);

    //Convert with turf
    // Optionally convert GeoJSON to WGS84 format
    const convertedToMercator = toMercator(myGeoJSON);
    console.log("Converted to Mercator", convertedToMercator);
    const svgPaths = this.darmstadtConverter.convert(this.myGeoJson());
    console.log("SVGPaths", svgPaths);

    const scaleFactor = 0.2;
    const viewportCenterX = 1220 / 2;
    const viewportCenterY = 1069 / 2;

    // Translate to reposition after scaling
    const transformedSvg = `
      <g transform="translate(${(1 - scaleFactor) * viewportCenterX}, ${
      (1 - scaleFactor) * viewportCenterY
    }) scale(${scaleFactor}, ${scaleFactor})">
        ${svgPaths.join("")}
      </g>`;

    // Sanitizing the SVG paths
    const sanitizedPath = this.sanitizer.bypassSecurityTrustHtml(
      svgPaths.join("")
    );
    return sanitizedPath;
  });
}
