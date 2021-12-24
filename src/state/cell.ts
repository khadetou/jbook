export type CellTypes = "code" | "text";
export interface Cell {
  id: string;
  code: CellTypes;
  content: string;
}
