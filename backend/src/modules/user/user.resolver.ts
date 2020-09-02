import { ListCount } from './../../common/interfaces/list-count.interface';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';

import { GetUser } from '../../common/decorators/get-user.decorator';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { User } from './user.entity';
import { UpdatePasswordInput } from './input/update-user-password.input';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { UpdateUserInput } from './input/update-user.input';

import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateImageInput } from '../../common/input/upload-image.input';
import { IUpdateImage } from '../../common/interfaces/upload-image.interface';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { PaginationInput } from '../../common/input/pagination.input';
import { Skill } from '../skill/skill.entity';
import { Service } from '../services/service.entity';

/**
 * User Resolver
 * Contains all GraphQL root types.
 */
@Resolver(of => UserType)
export class UserResolver implements IUpdateImage {
  
  constructor(private userService: UserService) {}

  /**
   * Uses the getUser method of the UserService service
   * to obtain a specific user.
   * @param id user id
  */
  @Query(returns => UserType)
  @UseGuards(GqlAuthGuard)
  user(@GetUser() user: User) {
    return this.userService.getUser(user);
  }

  @Mutation(returns => Boolean, { name: `updateUserImage` })
  @UseGuards(GqlAuthGuard)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @Args({ name: 'picture', type: () => GraphQLUpload }) image: FileUpload,
    @GetUser() user: User,
  ): Promise<boolean> {
    const { idImage } = updateImageInput;
    const context = new UpdateImageContext(this.userService);

    return context.executeUploadImage(
      idImage,
      UploadImageTypes.USERS,
      image,
      user,
    );
  }

  /**
   * Uses the getUser method of the UserService service
   * to update a specific user.
   * @param id user id
   * @param updateUserInput
   */
  @Mutation(returns => UserType)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.updateUser(updateUserInput, user);
  }

  /**
   * Uses the updateUserPassword method of the UserService
   * service to update a user's password
   * @param id user id
   * @param updatePasswordInput Fields that are necessary to
   * update password user's, these are in UpdatePasswordInput.
   */
  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  updateUserPassword(
    @Args('password') updatePasswordInput: UpdatePasswordInput,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.updateUserPassword(updatePasswordInput, user);
  }

  @Mutation(returns =>  Boolean)
  forgotPassword(
    @Args('email') email : string 
  ) : Promise<boolean> {
    return this.userService.forgotPassword(email);
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  generateToken(
    @GetUser() user: User,
  ){
    return this.userService.generateToken(user);
  }

  @ResolveField()
  async projects(
    @Args('paginationInput') paginationInput: PaginationInput,
    @Parent() user: User,
  ): Promise<ListCount> {
    return await this.userService.paginationProject(paginationInput);
  }


  @ResolveField()
  async skills(
    @Args('paginationInput') paginationInput: PaginationInput,
    @Parent() user: User,
  ): Promise<Skill[]> {
    return await this.userService.paginationSkill(paginationInput);
  }

  @ResolveField()
  async services(
    @Args('paginationInput') paginationInput: PaginationInput,
    @Parent() user: User,
  ): Promise<Service[]> {
    return await this.userService.paginationService(paginationInput);
  }
}
