import { ElementData } from "./element-data.model";

// Example of MyElement array
export const myElements: ElementData[] = [
  {
    name: "Single Point Location",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [8.635472780319304, 49.876478454060674],
        type: "Point",
      },
    },
  },
  {
    name: "A Line across Two Cities",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [8.638115538009231, 49.87707515428619],
          [8.637292489386311, 49.87712487897204],
        ],
        type: "LineString",
      },
    },
  },
  {
    name: "Park Area",
    myGeoJson: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [
            [8.636089280752174, 49.877891461481255],
            [8.636089280752174, 49.87752267469685],
            [8.636250032436294, 49.87752267469685],
            [8.636250032436294, 49.877891461481255],
            [8.636089280752174, 49.877891461481255],
          ],
        ],
        type: "Polygon",
      },
    },
  },
  {
    name: "Cities Feature Collection",
    myGeoJson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [12.4924, 41.8902], // Rome, Italy
          },
          properties: {
            name: "Rome",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-0.1276, 51.5074], // London, UK
          },
          properties: {
            name: "London",
          },
        },
      ],
    },
  },
];
