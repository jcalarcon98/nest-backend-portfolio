import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('Service')
export class ServiceType{

  @Field()
  id:  number;

  @Field({ description: 'Título del Servicio' })
  title : string;

  @Field({description : 'Descripción del servicio'})
  description : string;

  @Field({description: 'Imagen referencial del servicio'})
  image : string;


}