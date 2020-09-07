import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('Social')
export class SocialType{

  @Field({description: "Social Network"})
  name : string;

  @Field({description: "Social Network URL"})
  url : string;

  @Field({description: "Social Network image URL"})
  image : string;

}