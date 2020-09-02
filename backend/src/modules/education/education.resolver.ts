import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EducationService } from './education.service';
import { EducationType } from './education.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CreateOrUpdateEducationInput } from './input/create-or-update-education.input';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { Education } from './education.entity';

@Resolver('Education')
export class EducationResolver {

  constructor(private educationService : EducationService){}

  @Query(returns => EducationType)
  @UseGuards(GqlAuthGuard)
  education(@Args('id') id: number, @GetUser() user: User) {
    return this.educationService.getEducation(id, user);
  }

  @Mutation(returns => EducationType)
  @UseGuards(GqlAuthGuard)
  createEducation(
    @Args('createEducationInput') createEducationInput: CreateOrUpdateEducationInput,
    @GetUser() user: User,
  ): Promise<Education> {
    return this.educationService.createEducation(createEducationInput, user);
  }


  @Mutation(returns => EducationType)
  @UseGuards(GqlAuthGuard)
  updateEducation(
    @Args('id') id: number,
    @Args('updateEducationInput') updateEducationInput: CreateOrUpdateEducationInput,
    @GetUser() user: User,
  ): Promise<Education> {
    return this.educationService.updateEducation(id, updateEducationInput, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteEducation(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.educationService.deleteEducation(id, user);    
  }


}
