import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrUpdateExperienceInput{

  @IsNotEmpty({
    message: 'El nombre de la institución es obligatorio'
  })
  @Field({
    description:  'Nombre de Institución'
  })
  institution : string;

  @IsNotEmpty({
    message: 'El cargo es obligatorio'
  })
  @Field({
    description: 'Cargo que desempeño'
  })
  role : string;
  
  @IsNotEmpty({
    message: 'El año de inicio del cargo es obligatorio'
  })
  @Field({
    description: 'Año de Inicio del cargo'
  })
  initYear : number;

  @IsNotEmpty({
    message: 'El año de finalización del cargo es obligatorio'
  })
  @Field({
    description: 'Año de Finalización del cargo'
  })
  endYear : number;
  
  @Field({
    description: 'escripción opcional del cargo que cumplió',
    nullable: true
  })
  description : string;

}