import { CreateOrUpdateProjectInput } from '../modules/project/input/create-project.input';
import { Project } from 'src/modules/project/project.entity';
export class ProjectUtils{


  static getUpdatedProject(currentProject : Project, updateProjectInput : CreateOrUpdateProjectInput){
    
    const { title, description, urlDemo, urlRepository, status} = updateProjectInput;
    
    currentProject.title = title;
    currentProject.description = description;
    currentProject.urlDemo = urlDemo;
    currentProject.urlRepository = urlRepository;
    currentProject.status = status;

    return currentProject;
  }
  

}   