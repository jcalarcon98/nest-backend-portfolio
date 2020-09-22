import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CreateOrUpdateProjectInput } from './input/create-project.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { UpdateImageInput } from '../../common/input/upload-image.input';
import { IUpdateImage } from '../../common/interfaces/upload-image.interface';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { ProjectType } from './types/project.type';
import { PaginationInput } from '../../common/input/pagination.input';
import { ProjectCountType } from './types/project-count.type';

@Resolver('Project')
export class ProjectResolver implements IUpdateImage {
  constructor(private projectService: ProjectService) {}

  @Query(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  project(@Args('id') id: number, @GetUser() user: User) {
    return this.projectService.getProject(id, user);
  }

  @Query(returns => ProjectCountType)
  @UseGuards(GqlAuthGuard)
  projects(
    @Args('paginationInput') paginationInput: PaginationInput,
    @GetUser() user: User
  ){
    return this.projectService.getProjects(paginationInput, user);
  }

  @Mutation(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateOrUpdateProjectInput,
    @Args({ name: 'picture', type: () => GraphQLUpload, nullable: true }) image: FileUpload,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectInput, image, user);
  }

  @Mutation(returns => Boolean, { name: `updateProjectImage` })
  @UseGuards(GqlAuthGuard)
  updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @Args({ name: 'picture', type: () => GraphQLUpload }) image: FileUpload,
    @GetUser() user: User,
  ): Promise<string> {
    const { idImage } = updateImageInput;
    const context = new UpdateImageContext(this.projectService);

    return context.executeUploadImage(
      idImage,
      UploadImageTypes.PROJECTS,
      image,
      user,
    );
  }

  @Mutation(returns => ProjectType)
  @UseGuards(GqlAuthGuard)
  updateProject(
    @Args('id') id: number,
    @Args('updateProjectInput') updateProjectInput: CreateOrUpdateProjectInput,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectInput, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteProject(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.projectService.deleteProject(id, user);    
  }
}
