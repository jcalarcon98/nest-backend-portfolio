import { Experience } from '../modules/experience/experience.entity';
import { CreateOrUpdateExperienceInput } from '../modules/experience/input/create-or-update-experience.input';


export class ExperienceUtils{

  static getUpdatedExperience(currentExperience : Experience, updateExperienceInput: CreateOrUpdateExperienceInput){
    
    const {institution, role, initYear, endYear, description} = updateExperienceInput;

    currentExperience.institution = institution;
    currentExperience.role = role;
    currentExperience.initYear = initYear;
    currentExperience.endYear = endYear;
    currentExperience.description = description; 

    return currentExperience;
  }
  

}   