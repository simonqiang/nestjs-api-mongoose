import { Document } from 'mongoose';

export interface IShow extends Document {
  readonly name: string;

  readonly meta_title: string;

  readonly type: string;

  readonly actors: string;

  readonly description: string;

  readonly image_url: string;

  readonly director: string;

  readonly country: string;

  readonly language: string;

  readonly year: number;

  readonly addDate: Date;

  readonly rate: number;

  readonly hits: number;

  readonly show_url: string;
}