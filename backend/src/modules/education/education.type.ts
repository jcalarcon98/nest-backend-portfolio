
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Education')
export class EducationType{

  @Field({
    description:  'Nombre de Institución'
  })
  institution : string;

  @Field({
    description: 'Título obtenido'
  })
  title : string;
  
  @Field({
    description: 'Año de Inicio del estudio'
  })
  initYear : number;

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