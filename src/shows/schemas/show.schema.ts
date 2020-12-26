import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Show extends Document {
  @Prop()
  name: string;

  @Prop()
  meta_title: string;

  @Prop()
  type: string;

  @Prop()
  actors: string;

  @Prop()
  description: string;

  @Prop()
  image_url: string;

  @Prop()
  director: string;

  @Prop()
  country: string;

  @Prop()
  language: string;

  @Prop()
  year: number;

  @Prop()
  addDate: Date;

  @Prop()
  rate: number;

  @Prop()
  hits: number;

  @Prop()
  show_url: string;
}

export const ShowSchema = SchemaFactory.createForClass(Show);