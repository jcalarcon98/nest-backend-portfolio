import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class UpdateImageInput{

    @IsNotEmpty({
        message:  'The image ID is necessary'
    })
    @IsNumber({maxDecimalPlaces : 0}, {message: 'Integer number is necessary'})
    @Field()
    idImage : number;
}