import { ElementData } from "./element-data.model";

// Example of MyElement array
export const myElements: ElementData[] = [
  {
    name: "Hotel Park Inn",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [13.4127945253164, 52.522834561843354],
        type: "Point",
      },
    },
  },
  {
    name: "Samui to Tram Station",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [13.413736395618656, 52.521961655245946],
          [13.413911047065483, 52.52157832991165],
        ],
        type: "LineString",
      },
    },
  },
  {
    name: "Alexanderplatz Station",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [13.410148766851592, 52.521888623715995],
          [13.411682547005, 52.52094112427355],
          [13.41203379436871, 52.521183344120374],
          [13.410605388424642, 52.522137962278066],
        ],
        type: "LineString",
      },
    },
  },
];
