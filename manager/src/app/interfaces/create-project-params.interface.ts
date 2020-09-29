import { CreateProjectForm } from './create-project-form.interface';

export interface CreateProjectParams{
  createProjectInput: CreateProjectForm;
  picture?: File;
}
