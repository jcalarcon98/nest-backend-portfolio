import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateOrUpdatePhoneInput{

  @IsNotEmpty({
    message: "Phone number is required"
  })
  @Field({description: "Phone number"})
  number : string;

}