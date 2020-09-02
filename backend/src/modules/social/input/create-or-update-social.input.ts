import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

@InputType()
export class CreateOrUpdateSocialInput{
  
  @IsNotEmpty({
    message: "El nombre de la Red social es requerido"
  })
  @Length(2, 50, {
    message: "El nombre de la red social tiene que tener entre 2 y 50 caracteres"
  })
  @Field({description: "Nombre de la Red Social"})
  name : string;

  @IsNotEmpty({
    message: "La url de la red social es requerida"
  })
  @IsUrl()
  @Field({description: "Url de la Red social"})
  url : string;

}