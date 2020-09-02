import { InputType, OmitType } from "@nestjs/graphql";
import { CreateUserInput } from './create-user.input';

/**
 * This class allows you to define the fields that should go
 * when updating an existing user. Excluding the email and 
 * password fields.
 */
@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['email', 'password']) {}