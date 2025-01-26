import {
  IsInt,
  IsOptional,
  MinLength,
  IsString,
  IsPositive,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
