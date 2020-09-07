import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PhoneType{

  @Field({description: "Phone number"})
  number : string;

}