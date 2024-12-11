export interface Port {
  id: string;
  name: string;
  //Make the location can be left,right,top
  location: "left" | "right" | "top";
  color: string;
}
