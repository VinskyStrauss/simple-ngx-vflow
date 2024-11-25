import { Port } from "./port.model";
import { ElementData } from "./element-data.model";

export interface FeatureModel {
  id: string;
  name: string;
  ports: Port[];
  elements: ElementData;
}
