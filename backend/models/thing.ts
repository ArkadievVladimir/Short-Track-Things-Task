import { Schema, model, Mixed, Document } from 'mongoose';

export interface thingProp {
  _id?: string
  name?: string;
  body?: Mixed;
  createdAt?: number;
  _deletedAt?: number | null;
}

export type thingPropDocument = thingProp & Document;

const thingSchema = new Schema<thingPropDocument>({
  name: {
    type: String,
    required: true,
  },
  body: Schema.Types.Mixed,
  createdAt: Date,
  _deletedAt: { type: Date, default: null },
});

export const thing = model<thingPropDocument>('thing', thingSchema);
