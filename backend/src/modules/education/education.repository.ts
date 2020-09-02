import { EntityRepository, Repository } from "typeorm";
import { Education } from './education.entity';
import { CreateOrUpdateEducationInput } from './input/create-or-update-education.input';
import { User } from '../user/user.entity';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_EDUCATION } from '../../common/messages/education.message';
import { EducationUtils } from '../../utils/education.utils';

@EntityRepository(Education)
export class EducationRepository extends Repository<Education>{
  
  async getEducation(id: number, user: User): Promise<Education> {
    const education = await this.findOne({ id, userId: user.id });

    if (!education) {
      throw new NotFoundException(NOT_FOUND_EDUCATION);
    }
    return education;
  }
  
  async createEducation(createEducationInput: CreateOrUpdateEducationInput, user: User): Promise<Education> {
    
    let education = new Education();
    
    education = EducationUtils.getUpdatedEducation(education, createEducationInput);
    education.user = user;

    return await education.save();
  }

  async updateEducation(id: number, updateEducationInput: CreateOrUpdateEducationInput, user: User): Promise<Education> {

    let currentEducation = await this.getEducation(id, user);
    
    currentEducation = EducationUtils.getUpdatedEducation(currentEducation, updateEducationInput);

    return await currentEducation.save();
  }

  async deleteEducation(id: number, user: User): Promise<boolean> {
    
    const deletedEducation = await this.delete({ id, userId: user.id });

    if(deletedEducation.affected === 0){
      throw new NotFoundException(NOT_FOUND_EDUCATION);
    }
    
    return true;
  }

}