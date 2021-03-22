import { thingProp } from '../../services/thingFetch';
import { ThingActions, thingActionsType } from './actionTypes';

const defaultThingsState = {
  things: [],
  totalThingsCount: 0
};

export default function thingsReducer(state = defaultThingsState, action: ThingActions) {
  switch (action.type) {

    case thingActionsType.GET_THINGS_ALL:
      return {
        ...state,
        things: action.payload.things,
        totalThingsCount: action.payload.totalThingsCount
      }

    case thingActionsType.GET_THINGS_MERGE:
      return {
        ...state,
        things: [...state.things, ...action.payload.things],
        totalThingsCount: action.payload.totalThingsCount
      }

    case thingActionsType.GET_THINGS_REPLACE:
      return {
        ...state,
        things: action.payload.things,
        totalThingsCount: action.payload.totalThingsCount
      }

    case thingActionsType.CREATE_THING:
      return {
        ...state,
        things: [action.payload, ...state.things]
      }
      
    case thingActionsType.UPDATE_THINGS_BY_ID:
      const updatedThingsArray = state.things.map((item: thingProp) => {
        if (item._id === action.payload._id) {
          return { ...item, ...action.payload.newThing };
        }
        return item;
      });
      return {
        ...state,
        things: updatedThingsArray
      }

    case thingActionsType.DELETE_THINGS_BY_ID:
      const newThingsArray = state.things.filter((item: thingProp) => item._id !== action.payload._id);
      return {
        ...state,
        things: newThingsArray
      }

    case thingActionsType.DELETE_EMPTY_THING:
      const [ , ...array] = state.things
      return {
        ...state,
        things: array
      }

    default:
      return state
  }
}
