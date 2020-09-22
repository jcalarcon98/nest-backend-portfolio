import { ObjectType, Field, OmitType } from '@nestjs/graphql';
import { UserType } from '../../user/user.type';

/**
 * This class allows you to define the fields
 * that should go when creating a new user.
 */
@ObjectType('NewUser')
export class NewUserType extends OmitType(UserType, ['projects', 'services', 'skills']){

    @Field({
        description: "Access Token"
    })
    accessToken : string;
}