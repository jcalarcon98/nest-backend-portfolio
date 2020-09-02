import { ListCount } from './../../common/interfaces/list-count.interface';
import { SkillService } from './../skill/skill.service';
import { redis } from './../../config/redis.config';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdatePasswordInput } from './input/update-user-password.input';
import { UpdateUserInput } from './input/update-user.input';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { UserUtils } from '../../utils/user.utils';
import { ProjectService } from '../project/project.service';
import { PaginationInput } from '../../common/input/pagination.input';
import { IUpdateStrategy } from '../../common/strategies/update-image/upload-image.strategy';
import { Skill } from '../skill/skill.entity';
import { Service } from '../services/service.entity';
import { ServicesService } from '../services/services.service';
import { SendEmailContext } from '../../common/strategies/send-email/send-email.context';
import { ResetPasswordEmail } from '../../common/email/reset-password.email';
import { ResetPasswordDto } from './dto/reset-password.dto';

/**
 * User Service
 */
@Injectable()
export class UserService implements IUpdateStrategy {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private projectService: ProjectService,
    private skillService: SkillService,
    private servicesService: ServicesService
  ) {}

  /**
   * Uses the getUser method of the
   * UserRepository repository to get a specific user.
   * @param id user id
   */
  async getUser(user: User): Promise<User> {
    return await this.userRepository.getUser(user);
  }

  /**
   * Uses the updateUser method of the
   * UserRepository repository to update a existing user.
   * @param id user id
   * @param updateUserInput
   */
  updateUser(
    updateUserInput: UpdateUserInput,
    user: User,
  ): Promise<User> {
    return this.userRepository.updateUser(updateUserInput, user);
  }

  async updateUserPassword(
    updatePasswordInput: UpdatePasswordInput,
    user: User,
  ): Promise<boolean> {
    return await this.userRepository.updateUserPassword(
      updatePasswordInput,
      user,
    );
  }

  async updateImage(
    idImage: number,
    imageName: string,
    type: UploadImageTypes,
    user: User,
  ): Promise<boolean> {
    UserUtils.verifyCurrentUser(idImage, user.id);

    return (await this.userRepository.updateUserPhoto(
      idImage,
      imageName,
      UploadImageTypes.USERS,
      user,
    )) ? true : false;
  
  }


  //TODO change message
  async confirmEmail(id: string) :Promise<boolean>{
    
    const userId = await redis.get(id);

    if(!userId){
      throw new ForbiddenException('El tiempo expiro, por favor ejecuta el proceso nuevamente');
    } 

    redis.del(id);

    return this.userRepository.confirmEmail(parseInt(userId));
  }

  //TODO change message
  async resetPassword(id: string, newPassword: ResetPasswordDto): Promise<boolean> {
    
    const userId = await redis.get(id);
  
    if(!userId){
      throw new ForbiddenException('El tiempo expiro, por favor ejecuta el proceso nuevamente');
    }

    redis.del(id);
  
    return this.userRepository.resetPassword(parseInt(userId), newPassword);
  }

  async forgotPassword(email: string): Promise<boolean> {
    
    const user : User = await this.userRepository.getUserByEmail(email);     

    if(user){
      const context = new SendEmailContext(new ResetPasswordEmail(user));
      context.sendEmail(user.email, true);
    }

    return true;
  }

  generateToken(user: User){
    return this.userRepository.generateToken(user);
  }

  paginationProject(
    paginationInput: PaginationInput,
  ): Promise<ListCount> {
    return this.projectService.getProjects(paginationInput);
  }

  paginationSkill(paginationInput: PaginationInput):Promise<Skill[]> {
    return  this.skillService.getSkills(paginationInput);
  }

  paginationService(paginationInput: PaginationInput): Promise<Service[]> {
    return  this.servicesService.getServices(paginationInput);
  }
}
