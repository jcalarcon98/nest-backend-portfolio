import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('Social')
export class SocialType{

  @Field({description: "Nombre de la Red Social"})
  name : string;

  @Field({description: "Url de la Red social"})
  url : string;

  @Field({description: "Url de la imagen de la red social"})
  image : string;

}