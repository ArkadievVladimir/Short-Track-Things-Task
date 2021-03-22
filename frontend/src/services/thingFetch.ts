import axios from 'axios';

const URL = process.env.REACT_APP_URL_BACKEND || 'https://arkadiev-things-v2.herokuapp.com/api/v2/things';
export const paginationLimit = process.env.REACT_APP_PAGINATION_LIMIT || 10;
export interface thingProp {
  _id?: any;
  name: string;
  createdAt?: number;
}

export interface addNewResponseProp {
  _id?: string;
  status: number;
  createdAt?: number;
  things?: thingProp[];
}

export interface getResponseProp {
  status: number;
  data: {
    things: thingProp[];
    totalThingsCount: number;
  }
}

class FetchData {
  async getAll(): Promise<getResponseProp> {
    return await axios.get(URL);
  }

  async getLimitThing({ skip, paginationLimit }: any): Promise<getResponseProp> {
    return await axios.get(`${URL}?skip=${skip}&limit=${paginationLimit}`);
  }

  async addNew(newThing: thingProp): Promise<addNewResponseProp> {
    const { status, data: { _id, createdAt } } = await axios.post(URL, newThing);
    return { status, _id, createdAt };
  }

  async update(newThing: thingProp): Promise<number> {
    const { status } = await axios.put(`${URL}/${newThing._id}`, newThing);
    return status;
  }

  async deleteByID(id: string): Promise<number> {
    const { status } = await axios.delete(`${URL}/${id}`);
    return status;
  }
}

export const thingFetch = new FetchData();
