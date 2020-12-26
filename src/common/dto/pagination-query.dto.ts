import { IsOptional, IsPositive, IsString, IsBoolean } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsString()
  show_name: string;

  @IsOptional()
  @IsString()
  show_year: string;

  @IsOptional()
  @IsString()
  show_type: string;

  @IsOptional()
  @IsString()
  show_country: string;

  @IsOptional()
  @IsBoolean()
  sort_added_time: boolean;

  @IsOptional()
  @IsBoolean()
  sort_rate: boolean;

  @IsOptional()
  @IsBoolean()
  sort_hit: boolean;

}