import { ElementData } from "./model/element-data.model";

// Example of MyElement array
export const myElements: ElementData[] = [
  {
    name: "Hotel Park Inn",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [13.412792896517743, 52.522818469094005],
        type: "Point",
      },
    },
  },
  {
    name: "Fernsehturm",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [13.40940529404699, 52.52081096331179],
        type: "Point",
      },
    },
  },
  {
    name: "Samui to Fernsehturm",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [13.413752941809634, 52.52192283390457],
          [13.409427403801828, 52.5207948590847],
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
