import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';


@InputType()
export class CreaterOrUpdateServiceInput{

  @IsNotEmpty({
    message: 'Es necesario el titulo del servicio'
  })
  @Field({ description: 'Título del Servicio' })
  title : string;

  @IsNotEmpty({
    message: 'Es necesaria la descripción del servicio'
  })
  @Field({description : 'Descripción del servicio'})
  description : string;

}