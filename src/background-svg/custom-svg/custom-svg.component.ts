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
    mapExtent: { left: -337, bottom: -255, right: 337, top: 255 },
    viewportSize: { width: 674, height: 551 },
    // attributes: ["properties.class", "properties.foo"],
    mapExtentFromGeojson: true,
    explode: true,
    r: 5,
  });

  myGeoJson = computed<GeoJSON.GeoJSON | GeoJSON.GeometryCollection>(
    () => this.element().myGeoJson
  );

  //Change the latitute and longitude to x and y based on the parent svg width and height
  convertCoordinateToPixel(geoJson: any) {
    console.log("geoJson", geoJson);

    // Extract coordinates from the GeoJSON
    const [longitude, latitude] = geoJson.geometry.coordinates;

    // SVG dimensions and viewBox parameters
    const svgWidth = 674; // SVG width in pixels
    const svgHeight = 551; // SVG height in pixels
    const viewBoxX = 126; // X-coordinate of the viewBox origin
    const viewBoxY = 83; // Y-coordinate of the viewBox origin

    // Step 1: Convert longitude to X in viewBox coordinates
    let x = (longitude + 180) * (svgWidth / 360) + viewBoxX;

    // Step 2: Convert latitude to Y in viewBox coordinates
    // Convert from degrees to radians
    let latRad = (latitude * Math.PI) / 180;

    // Use Mercator projection for Y conversion
    let mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    let y = svgHeight / 2 - (svgWidth * mercN) / (2 * Math.PI) + viewBoxY;

    console.log("x", x, "y", y);
    return { x, y };
  }

  mySvg = computed(() => {
    console.log("myGeoJson", this.myGeoJson());
    this.convertCoordinateToPixel(this.myGeoJson());
    const svgPaths = this.converter.convert(this.myGeoJson());
    console.log("svgPaths", svgPaths.join(""));
    const sanitizedPath = this.sanitizer.bypassSecurityTrustHtml(
      svgPaths.join("")
    );
    console.log("sanitizedPath", sanitizedPath);
    return sanitizedPath;
    // return this.sanitizer.bypassSecurityTrustHtml(svgPaths.join(""));
  });
}
