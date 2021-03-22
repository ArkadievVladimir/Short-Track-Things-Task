import { thing, thingProp } from '../models/thing';

export interface responseGetProps {
  things: thingProp[];
  totalThingsCount: number;
}

export async function getAll(): Promise<responseGetProps> {
  const response = await thing.find({ _deletedAt: null })
    .select(['-_deletedAt', '-__v']);
  const totalThingsCount = response.length;
  const things = response ? response.reverse() : [];
  return { things, totalThingsCount };
}

export async function pagination(page: number, limit: number): Promise<responseGetProps> {
  const response = await getAll();
  response.things = response.things.splice((page - 1) * limit, limit);
  return response;
}

export async function infiniteScroll(skip: number, limit: number): Promise<responseGetProps> {
  const response = await getAll();
  response.things = response.things.splice(skip, limit);
  return response;
}

export function create(newProp: thingProp): Promise<thingProp> {
  const newThing = new thing({ ...newProp, createdAt: Date.now() });
  return newThing.save();
}

export async function update(id: string, valuesToUpdate: any): Promise<thingProp> {
  const newProp = Object.keys(valuesToUpdate).reduce((R: any, k: string): thingProp => {
    if (valuesToUpdate[k] !== undefined) {
      R[k] = valuesToUpdate[k];
    }

    return R;
  }, {});

  return await thing.updateOne({ _id: id }, newProp);
}

export async function deleteById(id: string): Promise<thingProp> {
  return await update(id, { _deletedAt: Date.now() });
}

export async function isIDExist(id: string): Promise<boolean> {
  const foundThing = await thing.find({ _deletedAt: null }).find({ _id: id });
  return !!foundThing.length;
}
