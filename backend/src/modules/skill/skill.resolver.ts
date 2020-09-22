import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SkillService } from './skill.service';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CreateOrUpdateSkillInput } from './input/create-or-update-skill.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { User } from '../user/user.entity';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Skill } from './skill.entity';
import { UpdateImageInput } from '../../common/input/upload-image.input';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { IUpdateImage } from '../../common/interfaces/upload-image.interface';
import { SkillType } from './types/skill.type';
import { SkillCountType } from './types/skill-count.type';
import { PaginationInput } from '../../common/input/pagination.input';



@Resolver('Skill')
export class SkillResolver implements IUpdateImage {

  constructor(private skillService: SkillService){}

  @Query(returns =>SkillType)
  @UseGuards(GqlAuthGuard)
  skill(
    @Args('id') id: number,
    @GetUser() user : User 
  ){
    return this.skillService.getSkill(id, user);
  }


  @Query(returns => SkillCountType)
  @UseGuards(GqlAuthGuard)
  skills(
    @Args('paginationInput') paginationInput: PaginationInput,
    @GetUser() user: User
  ){
    return this.skillService.getSkills(paginationInput, user);
  }

  @Mutation(returns => SkillType)
  @UseGuards(GqlAuthGuard)
  createSkill(
    @Args('createSkillInput') createSkillInput : CreateOrUpdateSkillInput,
    @Args({ name: 'picture', type: () => GraphQLUpload, nullable: true }) image: FileUpload,
    @GetUser() user : User
  ) : Promise<Skill>{
    return this.skillService.createSkill(createSkillInput, image, user);
  }

  @Mutation(returns => SkillType)
  @UseGuards(GqlAuthGuard)
  async updateSkill(
    @Args('id') id: number,
    @Args('updateSkillInput') updateSkillInput: CreateOrUpdateSkillInput,
    @GetUser() user: User,
  ): Promise<Skill> {
    return this.skillService.updateSkill(id, updateSkillInput, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteSkill(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.skillService.deleteSkill(id, user);    
  }

  @Mutation(returns => Boolean, { name: `updateSkillImage` })
  @UseGuards(GqlAuthGuard)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @Args({ name: 'picture', type: () => GraphQLUpload }) image: FileUpload,
    @GetUser() user: User,
  ): Promise<string> {
    
    const { idImage } = updateImageInput;
    
    const context = new UpdateImageContext(this.skillService);

    return context.executeUploadImage(
      idImage,
      UploadImageTypes.SKILLS,
      image,
      user,
    );
  }

}
