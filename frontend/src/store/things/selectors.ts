import { thingProp } from "../../services/thingFetch";

export const selectAllThings = (state: any): thingProp[] => state.data.things;

export const totalThingsCount = (state: any): number => state.data.totalThingsCount;
