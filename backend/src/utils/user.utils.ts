import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserInput } from '../modules/user/input/create-user.input';
import { UpdateUserInput } from '../modules/user/input/update-user.input';
import { User } from '../modules/user/user.entity';

import {
  DENIED_REQUEST,
  SERVER_ERROR,
} from '../common/messages/shared.message';
import { EMAIL_ALREADY_EXISTS } from '../common/messages/user.message';
import { JwtService } from '@nestjs/jwt';
import { AuthUtils } from './auth.utils';

import * as bcrypt from 'bcryptjs';
import * as config from 'config';
const jwtConfig = config.get('jwt');
const hostConfig = process.env.JENIKA_HOST || config.get('host').name;

export class UserUtils {
  static verifyCurrentUser(
    idUserSearch: number,
    idCurrentUser: number,
  ): boolean {
    if (idUserSearch !== idCurrentUser) {
      throw new UnauthorizedException(DENIED_REQUEST);
    }
    return true;
  }

  /**
   * This method allows you to return a user to either
   * create or update with their respective properties.
   * @param createOrUpdateUserInput
   */
  static getUser(
    createOrUpdateUserInput: CreateUserInput | UpdateUserInput,
  ): User {
    const {
      firstNames,
      lastNames,
      description,
      country,
      city,
      address,
    } = createOrUpdateUserInput;

    const user = new User();

    if (createOrUpdateUserInput.hasOwnProperty('email')) {
      user.email = createOrUpdateUserInput['email'];
      user.password = createOrUpdateUserInput['password'];
    }

    user.firstNames = firstNames;
    user.lastNames = lastNames;
    user.description = description;
    user.country = country;
    user.city = city;
    user.address = address;

    return user;
  }

  /**
   * In this method the current user is modified in memory
   * with the new parameters.
   * @param currentUser current user
   * @param updateUser updated user
   */
  static updateCurrentUser(currentUser: User, updateUser: User) {
    currentUser.firstNames = updateUser.firstNames;
    currentUser.lastNames = updateUser.lastNames;
    currentUser.description = updateUser.description;
    currentUser.country = updateUser.country;
    currentUser.city = updateUser.city;
    currentUser.address = updateUser.address;

    return currentUser;
  }

  /**
   * This method allows you to save a user and error message
   * will be sent if the email already exists
   * @param user
   */
  static async tryToSaveUser(user: User) {
    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(EMAIL_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException(SERVER_ERROR);
      }
    }
  }

  static async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  static async generateAccessToken(user: User) {
    const accessToken = await new JwtService({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
    }).sign(AuthUtils.getPayload(user.email));

    return accessToken;
  }

  static async validateToken(
    currentToken: string,
    userToken: string,
  ): Promise<boolean> {
    return bcrypt.compare(currentToken, userToken);
  }

}
