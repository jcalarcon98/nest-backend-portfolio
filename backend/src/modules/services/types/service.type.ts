import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('Service')
export class ServiceType{

  @Field()
  id:  number;

  @Field({ description: 'Service title' })
  title : string;

  @Field({description : 'Service description'})
  description : string;

  @Field({description: 'Service reference image'})
  image : string;


}