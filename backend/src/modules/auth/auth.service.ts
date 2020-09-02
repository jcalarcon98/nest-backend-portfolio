import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsInput } from './input/auth-credentials.input';
import { AuthUtils } from '../../utils/auth.utils';
import { CreateUserInput } from '../user/input/create-user.input';
import { NewUserType } from './types/new-user.type';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { ConfirmEmail } from '../../common/email/confirm.email';
import { SendEmailContext } from '../../common/strategies/send-email/send-email.context';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  
  //TODO change message
  async signIn(authCredentialsInput: AuthCredentialsInput) {
    const user: User = await this.userRepository.validateUserPassword(
      authCredentialsInput,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    return await this.getFullUser(user);
  }

  async signUp(createUserInput: CreateUserInput): Promise<NewUserType> {
    
    let user: User = await this.userRepository.createUser(createUserInput);
  
    const context = new SendEmailContext(new ConfirmEmail(user));
    context.sendEmail(user.email, true);
    
    return await this.getFullUser(user);  
  }

  async getFullUser(user: User): Promise<NewUserType> {
    const accessToken = await this.jwtService.sign(
      AuthUtils.getPayload(user.email),
    );

    return await AuthUtils.getUserWithAccessToken(accessToken, user);
  }
}
