import { FeatureModel } from "./model/feature.model";
import { v4 as uuidv4 } from "uuid"; // Import UUID generation function

export const mockDarmstadtData: FeatureModel[] = [
  {
    id: uuidv4(),
    name: "Etalytics",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "left",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "left",
      },
      {
        id: uuidv4(),
        name: "Port 3",
        location: "right",
      },
      {
        id: uuidv4(),
        name: "Port 4",
        location: "top",
      },
    ],
    elements: {
      name: "Etalytics",
      myGeoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [8.635531180871823, 49.88533259834702],
              [8.635397105365684, 49.885174685541216],
              [8.635572989361663, 49.885114306979176],
              [8.635274563237374, 49.88474831838636],
              [8.635594614443505, 49.884638707049476],
              [8.635949265779288, 49.88508272431659],
              [8.635695531489944, 49.8851672543378],
              [8.635681114769596, 49.88514588962104],
              [8.635632097918261, 49.885164467636116],
              [8.635712831555395, 49.88527407777917],
              [8.635531180871823, 49.88533259834702],
            ],
          ],
          type: "Polygon",
        },
      },
    },
  },
  {
    id: uuidv4(),
    name: "SR Parkett",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "top",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
      },
      {
        id: uuidv4(),
        name: "Port 3",
        location: "right",
      },
    ],
    elements: {
      name: "SR Parkett",
      myGeoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [8.636885339503209, 49.88484317874335],
              [8.636957919444058, 49.88480133623193],
              [8.637225319224456, 49.88493917025025],
              [8.637160379277049, 49.88498839658976],
              [8.636885339503209, 49.88484317874335],
            ],
          ],
          type: "Polygon",
        },
      },
    },
  },
  {
    id: uuidv4(),
    name: "No. 141",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "top",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
      },
    ],
    elements: {
      name: "No. 141",
      myGeoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [8.63548777080689, 49.883911351594605],
              [8.63548777080689, 49.88383232858888],
              [8.635642208865107, 49.88383232858888],
              [8.635642208865107, 49.883911351594605],
              [8.63548777080689, 49.883911351594605],
            ],
          ],
          type: "Polygon",
        },
      },
    },
  },
  {
    id: uuidv4(),
    name: "Kieser Training",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "top",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
      },
    ],
    elements: {
      name: "Kieser Training",
      myGeoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [8.636404427427891, 49.885202865971706],
              [8.636632181298978, 49.88503815007701],
              [8.637106281193041, 49.88550833759743],
              [8.636976136124957, 49.885568233767856],
              [8.636883175360708, 49.88557721818708],
              [8.636687957757772, 49.88549935316536],
              [8.636692605795048, 49.88546940504648],
              [8.636404427427891, 49.885202865971706],
            ],
          ],
          type: "Polygon",
        },
      },
    },
  },
];
