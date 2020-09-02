import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, Length, IsEmail, Matches} from 'class-validator';

/**
 * Allows you to define the fields
 * that should go when creating a new user.
 */
@InputType()
export class CreateUserInput {

    @Length(3, 50,
        { message:  "Los nombres deben tener por lo menos 3 caracteres y máximo 50 caracteres"})
    @Field()
    firstNames: string;

    @Length(3, 50,
        { message:  "Los nombres deben tener por lo menos 3 caracteres y máximo 50 caracteres"}) 
    @Field()
    lastNames: string;

    @MinLength(8, {
        message : "La contraseña debe tener al menos 8 caracteres"
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message : 'Asegurese que su contraseña sea segura'
    })
    @Field()
    password : string;

    @IsNotEmpty({
        message : "La descripción no puede estar vacia"
    })
    @Field()
    description : string;

    @IsEmail()
    @Field()
    email : string;
    
    @Length(3, 30, 
        { message : "El nombre del País debe terner por lo menos 3 caracteres y máximo 30 caracteres"})
    @Field()
    country : string;

    @Length(3, 30, 
        { message : "El nombre de la ciudad debe terner por lo menos 3 caracteres y máximo 30 caracteres"})
    @Field()
    city: string;

    @Field({
        nullable: true
    })
    address : string;
}