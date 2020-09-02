import { InputType, Field } from "@nestjs/graphql";
import { IsPhoneNumber, IsNotEmpty } from "class-validator";

@InputType()
export class CreateOrUpdatePhoneInput{

  @IsNotEmpty({
    message: "Se debe proporcionar el número telefónico"
  })
  @Field({description: "Número Telefónico"})
  number : string;

}