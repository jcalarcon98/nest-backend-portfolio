import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceType{

  @Field({
    description:  'Nombre de Institución'
  })
  institution : string;

  @Field({
    description: 'Cargo que desempeño'
  })
  role : string;
  
  @Field({
    description: 'Año de Inicio del cargo'
  })
  initYear : number;

  @Field({
    description: 'Año de Finalización del cargo'
  })
  endYear : number;

  @Field({
    description: 'Descripción opcional del cargo que cumplió',
    nullable: true
  })
  description : string;

}