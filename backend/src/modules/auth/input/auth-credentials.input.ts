import { InputType, PickType, Field } from '@nestjs/graphql';

import { CreateUserInput } from '../../user/input/create-user.input';

@InputType()
export class AuthCredentialsInput extends PickType(CreateUserInput, ['email']) {

    @Field()
    password : string;
}