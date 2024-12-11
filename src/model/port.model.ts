import { PortType } from "./port-type.model";

export interface Port {
  id: string;
  name: string;
  //Make the location can be left,right,top
  location: "left" | "right" | "top";
  type: PortType;
}
