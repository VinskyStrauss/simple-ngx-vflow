import { ElementModel } from "./model/element.model";
import { v4 as uuidv4 } from "uuid"; // Import UUID generation function

export const mockDarmstadtData: ElementModel[] = [
  {
    id: uuidv4(),
    name: "Etalytics",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "left",
        type: "Heating",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "left",
        type: "Cooling",
      },
      {
        id: uuidv4(),
        name: "Port 3",
        location: "right",
        type: "Electricity",
      },
      {
        id: uuidv4(),
        name: "Port 4",
        location: "top",
        type: "Electricity",
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
    features: [
      {
        id: uuidv4(),
        name: "Electricity",
        icon: "home", // Correct icon name for a bold icon
        unit: "kWh",
      },
      {
        id: uuidv4(),
        name: "Water Cooling",
        icon: "mode_fan",
        unit: "cfm",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "SR Parkett",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "top",
        type: "Electricity",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
        type: "Heating",
      },
      {
        id: uuidv4(),
        name: "Port 3",
        location: "right",
        type: "Cooling",
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
    features: [
      {
        id: uuidv4(),
        name: "Electricity",
        icon: "home", // Correct icon name for a bold icon
        unit: "kWh",
      },
      {
        id: uuidv4(),
        name: "Water Heating",
        icon: "hot_tub",
        unit: "°C",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "No. 141",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "top",
        type: "Electricity",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
        type: "Heating",
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
        type: "Electricity",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
        type: "Heating",
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
  {
    id: uuidv4(),
    name: "No. 15",
    ports: [
      {
        id: uuidv4(),
        name: "Port 1",
        location: "top",
        type: "Electricity",
      },
      {
        id: uuidv4(),
        name: "Port 2",
        location: "right",
        type: "Heating",
      },
    ],
    elements: {
      name: "No. 15",
      myGeoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [8.63607144269011, 49.88430587542956],
              [8.636246682177102, 49.88425797308756],
              [8.636283854190054, 49.88431614021053],
              [8.63611126984597, 49.88436575328976],
              [8.63607144269011, 49.88430587542956],
            ],
          ],
          type: "Polygon",
        },
      },
    },
  },
];
