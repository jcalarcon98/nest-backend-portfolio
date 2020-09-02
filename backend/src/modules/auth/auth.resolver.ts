import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthCredentialsInput } from './input/auth-credentials.input';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../user/input/create-user.input';
import { NewUserType } from './types/new-user.type';

@Resolver('Auth')
export class AuthResolver {

  constructor(private authService : AuthService){}

  @Mutation(returns => NewUserType)
  signIn(
    @Args('authCredentialsInput')  authCredentialsInput : AuthCredentialsInput
  ){
      return this.authService.signIn(authCredentialsInput);
  }

  @Mutation(returns => NewUserType)
  signUp(
    @Args('createUserInput') createUserInput : CreateUserInput
  ){
      return this.authService.signUp(createUserInput);
  }
}
