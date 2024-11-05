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
    //Convert longitude
    let x = (longitude + 180) * (674 / 360);
    //Convert latitude
    // convert from degrees to radians
    let latRad = (latitude * Math.PI) / 180;
    // get y value
    let mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    let y = 551 / 2 - (674 * mercN) / (2 * Math.PI);
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
