import { ListCount } from './../../common/interfaces/list-count.interface';
import { Injectable } from '@nestjs/common';
import { CreateOrUpdateProjectInput } from './input/create-project.input';
import { FileUpload } from 'graphql-upload';
import { User } from '../user/user.entity';
import { ProjectRepository } from './project.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';

import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { PaginationInput } from '../../common/input/pagination.input';
import { IUpdateStrategy } from '../../common/strategies/update-image/upload-image.strategy';

@Injectable()
export class ProjectService implements IUpdateStrategy {

  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  async getProject(id: number, user: User): Promise<Project> {
    return await this.projectRepository.getProject(id, user);
  }

  async getProjects(paginationInput: PaginationInput): Promise<ListCount> {
    return await this.projectRepository.getProjects(paginationInput);
  }

  async createProject(
    createProjectInput: CreateOrUpdateProjectInput,
    image: FileUpload,
    user: User,
  ) {
    const savedProject = await this.projectRepository.createProject(
      createProjectInput,
      user,
    );

    if (image) {
      const context = new UpdateImageContext(this);

      await context.executeUploadImage(
        savedProject.id,
        UploadImageTypes.PROJECTS,
        image,
        user,
      );
    }

    return savedProject;
  }

  async updateImage(
    idImage: number,
    imageName: string,
    type: UploadImageTypes,
    user: User,
  ): Promise<boolean> {
    return (await this.projectRepository.updateProjectPhoto(
      idImage,
      imageName,
      type,
      user,
    ))
      ? true
      : false;
  }

  async updateProject(
    id: number,
    updateImageInput: CreateOrUpdateProjectInput,
    user: User,
  ): Promise<Project> {
    return await this.projectRepository.updateProject(
      id,
      updateImageInput,
      user,
    );
  }


  async deleteProject(id: number, user: User) : Promise<boolean> {    
    return await this.projectRepository.deleteProject(id, user);
  }
}
