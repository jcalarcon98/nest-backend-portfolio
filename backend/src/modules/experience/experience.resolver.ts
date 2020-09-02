import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ExperienceService } from './experience.service';
import { ExperienceType } from './experience.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { Experience } from './experience.entity';
import { CreateOrUpdateExperienceInput } from './input/create-or-update-experience.input';

@Resolver('Experience')
export class ExperienceResolver {

  constructor(private experienceService: ExperienceService){}

  @Query(returns => ExperienceType)
  @UseGuards(GqlAuthGuard)
  experience(@Args('id') id: number, @GetUser() user: User) : Promise<Experience>{
    return this.experienceService.getExperience(id, user);
  }

  @Mutation(returns => ExperienceType)
  @UseGuards(GqlAuthGuard)
  createExperience(
    @Args('createExperienceInput') createExperienceInput: CreateOrUpdateExperienceInput,
    @GetUser() user: User,
  ): Promise<Experience> {
    return this.experienceService.createExperience(createExperienceInput, user);
  }


  @Mutation(returns => ExperienceType)
  @UseGuards(GqlAuthGuard)
  updateExperience(
    @Args('id') id: number,
    @Args('updateExperienceInput') updateExperienceInput: CreateOrUpdateExperienceInput,
    @GetUser() user: User,
  ): Promise<Experience> {
    return this.experienceService.updateExperience(id, updateExperienceInput, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteExperience(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.experienceService.deleteExperience(id, user);    
  }


}
