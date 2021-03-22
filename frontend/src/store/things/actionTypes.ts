import { Action } from "redux";
import { thingProp } from "../../services/thingFetch";

export enum thingActionsType {
  GET_THINGS_ALL = 'GET_THINGS_ALL',
  GET_THINGS_MERGE = 'GET_THINGS_MERGE',
  GET_THINGS_REPLACE = 'GET_THINGS_REPLACE',
  CREATE_THING = 'CREATE_THING',
  UPDATE_THINGS_BY_ID = 'UPDATE_THINGS_BY_ID',
  UPDATE_EMPTY_THINGS = 'UPDATE_EMPTY_THINGS',
  DELETE_THINGS_BY_ID = 'DELETE_THINGS_BY_ID',
  DELETE_EMPTY_THING = 'DELETE_EMPTY_THING',
};

export interface GetThingsActionInterface extends Action<thingActionsType> {
  type: thingActionsType.GET_THINGS_ALL;
  payload: {
    things: thingProp[];
    totalThingsCount: number;
  };
};

export interface GetThingsPaginationActionInterface extends Action<thingActionsType> {
  type: thingActionsType.GET_THINGS_MERGE | thingActionsType.GET_THINGS_REPLACE;
  payload: {
    things: thingProp[];
    totalThingsCount: number;
  };
};

export interface CreateThingActionInterface extends Action<thingActionsType> {
  type: thingActionsType.CREATE_THING;
  payload: thingProp;
};

export interface UpdateThingActionInterface extends Action<thingActionsType> {
  type: thingActionsType.UPDATE_THINGS_BY_ID | thingActionsType.UPDATE_EMPTY_THINGS;
  payload: {
    _id: string,
    newThing: thingProp
  };
};

export interface DeleteThingActionInterface extends Action<thingActionsType> {
  type: thingActionsType.DELETE_THINGS_BY_ID;
  payload: {
    _id: string
  };
};

export interface DeleteEmptyThingActionInterface extends Action<thingActionsType> {
  type: thingActionsType.DELETE_EMPTY_THING;
};

export type ThingActions = GetThingsActionInterface
| GetThingsPaginationActionInterface
| CreateThingActionInterface
| UpdateThingActionInterface
| DeleteThingActionInterface
| DeleteEmptyThingActionInterface;
