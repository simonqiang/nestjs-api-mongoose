import { IsOptional, IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateShowDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly meta_title: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly actors: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly image_url: string;

  @IsOptional()
  @IsString()
  readonly director: string;

  @IsOptional()
  @IsString()
  readonly country: string;

  @IsOptional()
  @IsString()
  readonly language: string;

  @IsOptional()
  @IsNumber()
  readonly year: number;

  @IsOptional()
  readonly addDate: Date;

  @IsOptional()
  @IsNumber()
  readonly rate: number;

  @IsOptional()
  @IsNumber()
  readonly hits: number;

  @IsOptional()
  @IsNumber()
  readonly show_url: string;
}