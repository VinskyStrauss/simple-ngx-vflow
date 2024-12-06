import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  Input,
  OnInit,
} from "@angular/core";
import { ElementData } from "../../model/element-data.model";
import { GeoJSON2SVG } from "geojson2svg";
import { DomSanitizer } from "@angular/platform-browser";
import reproject from "reproject";
import proj4 from "proj4";
import { toMercator, toWgs84 } from "@turf/projection";
import { svg } from "d3";

@Component({
  selector: "svg:g[custom-element]",
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  styles: `
      :host { 
          display: contents;
          width: 200px,
          height: 200px,
      }
    `,
  host: {
    "[innerHTML]": "mySvg()",
  },
})
export class CustomSvgComponent {
  element = input<ElementData>(); // Assume ElementData includes myGeoJson property
  width = input<number>();
  height = input<number>();
  private sanitizer = inject(DomSanitizer);

  //Converter for the darmstadt grafenhauser map
  darmstadtConverter = new GeoJSON2SVG({
    /* mapExtent: {
      left: 8.634022529410913, // longitude for top-left corner
      bottom: 49.8835094952137, // latitude for bottom-right corner
      right: 8.638534952430376, // longitude for bottom-right corner
      top: 49.88613737107883, // latitude for top-left corner
    }, */
    viewportSize: { width: this.width() ?? 200, height: this.height() ?? 200 },
    r: 10,
  });

  // Reactive accessor for GeoJSON data
  myGeoJson = computed(() => this.element()?.myGeoJson);

  // Generate SVG path data from GeoJSON and render it as SVG
  mySvg = computed(() => {
    console.log(this.myGeoJson());
    //Transforming the GeoJson coordinates to pixel coordinates
    const myGeoJSON = this.myGeoJson() as any;
    if (!myGeoJSON) {
      return;
    }

    //Convert with turf
    // Optionally convert GeoJSON to WGS84 format
    const convertedToMercator = toMercator(myGeoJSON);
    console.log("Converted to Mercator", convertedToMercator);
    const svgPaths = this.darmstadtConverter.convert(convertedToMercator);
    console.log("SVGPaths", svgPaths);

    const scaleFactor = 1;

    // Translate to reposition after scaling
    const transformedSvg = `
      <g transform=" scale(${scaleFactor}, ${scaleFactor})">
        ${svgPaths.join("")}
      </g>`;

    // Sanitizing the SVG paths
    const sanitizedPath =
      this.sanitizer.bypassSecurityTrustHtml(transformedSvg);
    return sanitizedPath;
  });
}
