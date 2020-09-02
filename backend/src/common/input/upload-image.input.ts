import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class UpdateImageInput{

    @IsNotEmpty({
        message:  'El identificador de la Imagen no es el correcto'
    })
    @IsNumber({maxDecimalPlaces : 0}, {message: 'Es necesario un numero entero'})
    @Field()
    idImage : number;
}