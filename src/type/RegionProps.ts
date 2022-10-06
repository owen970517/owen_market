import { IData } from "./ItemProps";

export interface IRegion {
    data : IData[];
    activeRegion : string;
    setActiveRegion : () => void;
    setFiltered : () => void;
}