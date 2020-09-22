import { ListCount } from './../../common/interfaces/list-count.interface';
import { Repository, EntityRepository } from 'typeorm';
import { Project } from './project.entity';
import { CreateOrUpdateProjectInput } from './input/create-project.input';
import { User } from '../user/user.entity';
import { ShareUtils } from '../../utils/share.utils';
import { NotFoundException } from '@nestjs/common';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { NOT_FOUND_PROJECT } from '../../common/messages/project.message';
import { ProjectUtils } from '../../utils/project.utils';
import { PaginationInput } from '../../common/input/pagination.input';


@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

  
  async getProject(id: number, user: User): Promise<Project> {
    
    const project = await this.findOne({ where: { id, userId: user.id } });

    if (!project) {
      throw new NotFoundException(NOT_FOUND_PROJECT);
    }
    return project;
  }

  async getProjects(paginationInput: PaginationInput, user: User): Promise<ListCount>{
    
    const { skip, take } = paginationInput;

    const projectsArray: any[] = await this.findAndCount({
      where: {
        userId: user.id
      },
      skip,
      take,
    });

    const objectPresent: ListCount = {
      list: projectsArray[0],
      count: projectsArray[1],
    };

    return objectPresent;
  }

  async createProject(
    createProjectInput: CreateOrUpdateProjectInput,
    user: User,
  ) {
    let project = new Project();

    project = ProjectUtils.getUpdatedProject(project, createProjectInput);
    project.user = user;

    return await project.save();
  }

  async updateProjectPhoto(
    id: number,
    imageName: string,
    type: UploadImageTypes,
    user: User,
  ): Promise<Project> {
    let currentProject = await this.getProject(id, user);

    const currentPhoto = currentProject.image;

    if (currentPhoto) {
      ShareUtils.deleteIfExistsCurrentImage(type, currentPhoto);
    }

    currentProject.image = imageName;

    return await currentProject.save();
  }

  async updateProject(
    id: number,
    updateProjectInput: CreateOrUpdateProjectInput,
    user: User,
  ): Promise<Project> {
    let currentProject = await this.getProject(id, user);

    currentProject = ProjectUtils.getUpdatedProject(
      currentProject,
      updateProjectInput,
    );

    return await currentProject.save();
  }

  async deleteProject(id: number, user: User):  Promise<boolean> {
    
    const deleteProject  = await this.getProject(id, user);
    
    if(deleteProject.image){
      ShareUtils.deleteIfExistsCurrentImage(UploadImageTypes.PROJECTS, deleteProject.image);
    }
    return await deleteProject.remove() ? true: false;
  }
}
