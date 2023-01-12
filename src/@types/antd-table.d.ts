export interface schema {
  id?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  timestamp?: string;
  tags?: string[];
  status?: string;
}

export type noteContextType = {
  table: schema[];
  addData: (schema) => void;
  getData: () => void;
  deleteData: (string) => void;
};
