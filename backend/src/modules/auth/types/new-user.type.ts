import {  ObjectType, Field } from '@nestjs/graphql';

import { UserType } from '../../user/user.type';

/**
 * This class allows you to define the fields
 * that should go when creating a new user.
 */
@ObjectType('NewUser')
export class NewUserType extends UserType{

    @Field({
        description: "Person access token after register"
    })
    accessToken : string;
}