// export interface DataT {
//   id: number;
//   name: string;
//   sortOrder: number;
//   icon: string | null;
//   route: string;
//   parentId: number;
// }
export interface MenuT {
  id: number;
  name: string;
  sortOrder: number;
  icon: any;
  route: string;
  parentId: number;
  children?: MenuT[];
}
