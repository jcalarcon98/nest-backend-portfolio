import { CreateUserInput } from './create-user.input';
import { InputType, PickType } from '@nestjs/graphql';
/**
 * This class allows you to define the fields
 * that should go when creating a new user.
 */
@InputType()
export class UpdatePasswordInput extends PickType(CreateUserInput, ['password']) {}