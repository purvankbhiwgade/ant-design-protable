import { createContext } from "react";
import { noteContextType } from "../@types/antd-table";

const NoteContext = createContext<noteContextType | null>(null);

export default NoteContext;
