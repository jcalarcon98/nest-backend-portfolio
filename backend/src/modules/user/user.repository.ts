import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { AuthCredentialsInput } from '../auth/input/auth-credentials.input';
import { CreateUserInput } from './input/create-user.input';
import { ShareUtils } from '../../utils/share.utils';
import { UpdatePasswordInput } from './input/update-user-password.input';
import { UpdateUserInput } from './input/update-user.input';
import { User } from './user.entity';
import { UserUtils } from '../../utils/user.utils';
import { SERVER_ERROR, DENIED_REQUEST } from '../../common/messages/shared.message';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtPayload } from '../../modules/auth/jwt-payload.interface';
/**
 * User Repository
 * Contains all the methods that directly manipulate
 * the database.
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  
  /**
   * Get a specific user from the database
   * @param id  user id
   */
  async getUser(user: User): Promise<User> {
    return user;
  }

  /**
   * Create a new user in the database
   * @param createUserInput Fields that are necessary to
   * create an user, these are in CreateUserInput.
   */
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    
    const user = UserUtils.getUser(createUserInput);
    
    return await UserUtils.tryToSaveUser(user);
  }

  /**
   * Updating an existing database user
   * @param id  user id
   * @param updateUserInput Fields that are necessary to
   * update an user, these are in UpdatePasswordInput.
   */
  async updateUser(
    updateUserInput: UpdateUserInput,
    user: User,
  ): Promise<User> {
    const updateUser = UserUtils.getUser(updateUserInput);

    user = UserUtils.updateCurrentUser(user, updateUser);

    return await UserUtils.tryToSaveUser(user);
  }  


  /**
   * Update user's password in the database.
   * @param id user id
   * @param updatePasswordInput Fields that are necessary to
   * update password user's, these are in UpdatePasswordInput.
   */
  async updateUserPassword(
    updatePasswordInput: UpdatePasswordInput,
    user: User,
  ): Promise<boolean> {
    const { password } = updatePasswordInput;

    user.password = await UserUtils.encryptPassword(password);

    try {
      return await user.save() ? true : false;
    } catch (error) {
      throw new InternalServerErrorException(SERVER_ERROR);
    }
  }

  /**
   * Update user's image in the database.
   * @param id user id
   * @param imageName
   */
  async updateUserPhoto(
    id: number,
    imageName: string,
    type: string,
    user: User,
  ) {
    UserUtils.verifyCurrentUser(id, user.id);

    let currentPhoto = user.image;

    if (currentPhoto) {
      ShareUtils.deleteIfExistsCurrentImage(type, currentPhoto);
    }
    user.image = imageName;

    return await UserUtils.tryToSaveUser(user);
  }

async validateUserPassword(
    authCredentialsInput: AuthCredentialsInput,
  ): Promise<User> {
    const { email, password } = authCredentialsInput;

    const user: User = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user;
    } else {
      return null;
    }
  }

  async validateToken(accessToken:  JwtPayload){
    
    const { email } = accessToken;

    return await this.getUserByEmail(email);
  }

  async confirmEmail(userId: number) : Promise<boolean> {
    
    let user: User = await this.findOne({ id: userId });
    
    user.confirmed = true;

    await user.save();

    return true;
  }

  async resetPassword(userId: number, newPassword : ResetPasswordDto): Promise<boolean> {
    
    const { password } = newPassword;

    let user: User = await this.findOne({ id: userId });

    user.password = await UserUtils.encryptPassword(password);

    try {
      return await user.save() ? true : false;
    } catch (error) {
      throw new InternalServerErrorException(SERVER_ERROR);
    }
  }

  async getUserByEmail(email: string): Promise<User> {    

    const user = await this.findOne({email});

    if(!user){
      throw new UnauthorizedException(DENIED_REQUEST);
    }

    return user;
  }

  async generateToken(user: User){
    const token = await UserUtils.generateAccessToken(user);

    const encryptedToken = await UserUtils.encryptPassword(token);

    user.apiToken = encryptedToken;

    const currentUser = await user.save();

    if(currentUser){
      return token;
    }

    throw new InternalServerErrorException(SERVER_ERROR);
  }

}
