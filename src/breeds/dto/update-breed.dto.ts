import { IsString, MinLength } from 'class-validator';

export class UpdateBreedDto {
  @IsString()
  @MinLength(3)
  name?: string;
}
