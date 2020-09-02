import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from '../user/user.repository';

import * as config from 'config';
import { DENIED_REQUEST } from '../../common/messages/shared.message';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){  
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey :  process.env.JWT_SECRET || config.get('jwt.secret'),
        });
    }

    async validate(payload : JwtPayload){

        const {email} = payload;
        const user = await this.userRepository.findOne({ email });
        
        if(!user){
            throw  new UnauthorizedException(DENIED_REQUEST);
        }
        
        return user;
    } 
}