import { CreateOrUpdateProjectInput } from '../modules/project/input/create-project.input';
import { Project } from 'src/modules/project/project.entity';
export class ProjectUtils{


  static getUpdatedProject(currentProject : Project, updateProjectInput : CreateOrUpdateProjectInput){
    
    const { title, description, url, status} = updateProjectInput;
    
    currentProject.title = title;
    currentProject.description = description;
    currentProject.urlProject = url;
    currentProject.status = status;

    return currentProject;
  }
  

}   