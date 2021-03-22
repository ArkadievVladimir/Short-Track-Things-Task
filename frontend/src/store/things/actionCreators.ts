
import { Dispatch } from 'redux';
import { thingFetch, thingProp } from '../../services/thingFetch';
import {
  CreateThingActionInterface,
  DeleteEmptyThingActionInterface,
  DeleteThingActionInterface,
  GetThingsActionInterface,
  GetThingsPaginationActionInterface,
  thingActionsType,
  UpdateThingActionInterface
} from './actionTypes';

export const getAll = () =>
  async (dispatch: Dispatch<GetThingsActionInterface>) => {
  const { data, status } = await thingFetch.getAll();
  if (status === 200) {
    dispatch({
      type: thingActionsType.GET_THINGS_ALL,
      payload: data
    });
  }
}

export const getLimited = (skip: number = 0, isMergeResult: boolean = true) => 
  async (dispatch: Dispatch<GetThingsPaginationActionInterface>) => {
  const paginationLimit = process.env.REACT_APP_PAGINATION_LIMIT || 10;
  const { data, status } = await thingFetch.getLimitThing({ skip, paginationLimit });
  if (status === 200) {
    if (isMergeResult) {
      dispatch({
        type: thingActionsType.GET_THINGS_MERGE,
        payload: data
      });
    } else {
      dispatch({
        type: thingActionsType.GET_THINGS_REPLACE,
        payload: data
      });
    }
  }
}

export const addNew = (thingName: string) =>
  async (dispatch: Dispatch<CreateThingActionInterface>) => {
  const newThing = {
    name: thingName,
  }
  const { status, _id, createdAt } = await thingFetch.addNew(newThing);
  if (status === 200) {
    dispatch({
      type: thingActionsType.CREATE_THING,
      payload: { ...newThing, _id, createdAt }
    });
  }
}

export const addNewEmpty = () =>
  async (dispatch: Dispatch<CreateThingActionInterface>) => {
  dispatch({
    type: thingActionsType.CREATE_THING,
    payload: { name: '' }
  });
}

export const updateByID = ({ _id, newThing }: { _id: string, newThing: thingProp }) => 
  async (dispatch: Dispatch<UpdateThingActionInterface>) => {
  const status: number = await thingFetch.update({ _id, ...newThing });
  if (status === 200) {
    dispatch({
      type: thingActionsType.UPDATE_THINGS_BY_ID,
      payload: { _id: _id, newThing: newThing }
    });
  }
}

export const deleteByID = (id: string) =>
  async (dispatch: Dispatch<DeleteThingActionInterface>) => {
  const status: number = await thingFetch.deleteByID(id);
  if (status === 200) {
    dispatch({
      type: thingActionsType.DELETE_THINGS_BY_ID,
      payload: { _id: id }
    });
  }
}

export const deleteEmpty = () =>
  async (dispatch: Dispatch<DeleteEmptyThingActionInterface>) => {
  dispatch({
    type: thingActionsType.DELETE_EMPTY_THING,
  });
}
