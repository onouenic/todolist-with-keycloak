import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Informe um nome válido' })
  @IsNotEmpty({ message: 'Você precisa informar um email ' })
  name: string;
}