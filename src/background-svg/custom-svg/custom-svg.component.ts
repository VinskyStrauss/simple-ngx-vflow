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

  // Configure GeoJSON2SVG with map extent and viewport based on your SVG viewBox
  converter = new GeoJSON2SVG({
    mapExtent: {
      left: 13.407647596596377, // longitude for top-left corner
      bottom: 52.519272639839926, // latitude for bottom-right corner
      right: 13.414813166706523, // longitude for bottom-right corner
      top: 52.52330727598482, // latitude for top-left corner
    },
    viewportSize: { width: 674, height: 551 },
    explode: true,
    r: 5,
  });

  // Reactive accessor for GeoJSON data
  myGeoJson = computed(() => this.element.myGeoJson);

  // Convert GeoJSON coordinates to pixels based on SVG dimensions and viewBox
  convertCoordinateToPixel(geoJson: any) {
    const svgWidth = 674;
    const svgHeight = 551;
    const viewBoxX = 126;
    const viewBoxY = 83;

    const coordinates = geoJson.geometry.coordinates;

    const convertSingleCoordinate = ([longitude, latitude]: [
      number,
      number
    ]) => {
      const x = ((longitude + 180) / 360) * svgWidth + viewBoxX;

      const latRad = (latitude * Math.PI) / 180;
      const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      const y = svgHeight / 2 - (svgWidth * mercN) / (2 * Math.PI) + viewBoxY;
      console.log(x, y);
      return [x, y];
    };

    // If the coordinates represent a single point (e.g., [longitude, latitude])
    if (typeof coordinates[0] === "number") {
      return convertSingleCoordinate(coordinates as [number, number]);
    }

    // If the coordinates represent multiple points (e.g., [[longitude, latitude], [longitude, latitude], ...])
    return coordinates.map((coord: [number, number]) =>
      convertSingleCoordinate(coord)
    );
  }

  // Generate SVG path data from GeoJSON and render it as SVG
  mySvg = computed(() => {
    console.log(this.myGeoJson());
    //Transforming the GeoJson coordinates to pixel coordinates
    const myGeoJSON = this.myGeoJson() as any;
    const transformedGeoJson = {
      ...myGeoJSON,
      geometry: {
        ...myGeoJSON.geometry,
        coordinates: this.convertCoordinateToPixel(this.myGeoJson()),
      },
    };
    console.log("After Transform", transformedGeoJson);
    const svgPaths = this.converter.convert(this.myGeoJson());
    console.log("SVGPaths", svgPaths);
    const svgTransformedPaths = this.converter.convert(transformedGeoJson);
    console.log("SVGPaths Transformed", svgTransformedPaths);
    // Sanitizing the SVG paths
    const sanitizedPath = this.sanitizer.bypassSecurityTrustHtml(
      svgPaths.join("")
    );
    return sanitizedPath;
  });
}
