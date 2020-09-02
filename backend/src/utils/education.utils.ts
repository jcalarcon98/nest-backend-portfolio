import { Education } from '../modules/education/education.entity';
import { CreateOrUpdateEducationInput } from '../modules/education/input/create-or-update-education.input';

export class EducationUtils{


  static getUpdatedEducation(currentEducation : Education, updateEducationInput : CreateOrUpdateEducationInput){
    
    const {institution, title, initYear, endYear, description} = updateEducationInput;

    currentEducation.institution = institution;
    currentEducation.title = title;
    currentEducation.initYear = initYear;
    currentEducation.endYear = endYear;
    currentEducation.description = description; 

    return currentEducation;
  }
  

}   