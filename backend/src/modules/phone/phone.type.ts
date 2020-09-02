import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PhoneType{

  @Field({description: "Número Telefónico"})
  number : string;

}