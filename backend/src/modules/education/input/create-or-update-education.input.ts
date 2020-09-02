import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrUpdateEducationInput{

  @IsNotEmpty({
    message: 'El nombre de la institución es obligatorio'
  })
  @Field({
    description:  'Nombre de Institución'
  })
  institution : string;

  @IsNotEmpty({
    message: 'El título obtenido es obligatorio'
  })
  @Field({
    description: 'Título obtenido'
  })
  title : string;
  
  @IsNotEmpty({
    message: 'El año de inicio del estudio es obligatorio'
  })
  @Field({
    description: 'Año de Inicio del estudio'
  })
  initYear : number;

  @IsNotEmpty({
    message: 'El año de finalización del estudio es obligatorio'
  })
  @Field({
    description: 'Año de Finalización del estudio'
  })
  endYear : number;
  
  @Field({
    description: 'Descripción opcional del periodo de estudio',
    nullable: true
  })
  description : string;

}