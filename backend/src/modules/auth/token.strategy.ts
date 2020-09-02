import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-accesstoken';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { JwtPayload } from '../../modules/auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as config from 'config';
import { DENIED_REQUEST } from '../../common/messages/shared.message';
import { UserUtils } from '../../utils/user.utils';
const jwtConfig = config.get('jwt');

export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      tokenHeader: 'ApiToken',
    });
  }

  async validate(token: string) {
    
    const accessToken : JwtPayload = await new JwtService({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
    }).verify(token);

    const user : User = await this.userRepository.validateToken(accessToken);

    const isTokenValid = UserUtils.validateToken(token, user.apiToken);

    if (!isTokenValid) {
      throw new UnauthorizedException(DENIED_REQUEST);
    }
    return user;
  }
}
