import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {

  @IsNotEmpty()
  @IsString()
  title: string;


  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
