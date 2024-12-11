import { Port } from "./port.model";
import { ElementData } from "./element-data.model";
import { FeatureModel } from "./feature.model";

export interface ElementModel {
  id: string;
  name: string;
  ports: Port[];
  elements: ElementData;
  features?: FeatureModel[];
}
