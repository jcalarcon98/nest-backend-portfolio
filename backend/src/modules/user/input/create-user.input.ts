import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, Length, IsEmail, Matches} from 'class-validator';

/**
 * Allows you to define the fields
 * that should go when creating a new user.
 */
@InputType()
export class CreateUserInput {

    @Length(3, 50,
        { message:  "Names must be at least 3 characters and maximum 50 characters"})
    @Field()
    firstNames: string;

    @Length(3, 50,
        { message:  "Lastnames must have at least 3 characters and a maximum of 50 characters"}) 
    @Field()
    lastNames: string;

    @MinLength(8, {
        message : "The password must be at least 8 characters long"
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message : 'Make sure your password is secure'
    })
    
    @Field()
    password : string;

    @Field({
        nullable: true
    })
    description : string;

    @IsEmail()
    @Field()
    email : string;
    
    @Length(3, 30, 
        { message : "Country name must have at least 3 characters and a maximum of 30 characters"})
    @Field()
    country : string;

    @Length(3, 30, 
        { message : "City name must have at least 3 characters and a maximum of 30 characters"})
    @Field()
    city: string;

    @Field({
        nullable: true
    })
    address : string;
}