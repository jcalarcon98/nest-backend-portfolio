import { Experience } from './experience.entity';
import { Repository, EntityRepository } from "typeorm";
import { User } from '../user/user.entity';
import { CreateOrUpdateExperienceInput } from './input/create-or-update-experience.input';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_EXPERIENCE } from '../../common/messages/experience.message';
import { ExperienceUtils } from '../../utils/experience.utils';

@EntityRepository(Experience)
export class ExperienceRepository extends Repository<Experience>{

  async getExperience(id: number, user: User): Promise<Experience> {
    const experience = await this.findOne({ id, userId: user.id });

    if (!experience) {
      throw new NotFoundException(NOT_FOUND_EXPERIENCE);
    }
    return experience;
  }
  
  async createExperience(createExperienceInput: CreateOrUpdateExperienceInput, user: User): Promise<Experience> {
    
    let experience = new Experience();
    
    experience = ExperienceUtils.getUpdatedExperience(experience, createExperienceInput);
    experience.user = user;

    return await experience.save();
  }

  async updateExperience(id: number, updateExperienceInput: CreateOrUpdateExperienceInput, user: User): Promise<Experience> {

    let currentExperience = await this.getExperience(id, user);
    
    currentExperience = ExperienceUtils.getUpdatedExperience(currentExperience, updateExperienceInput);

    return await currentExperience.save();
  }

  async deleteExperience(id: number, user: User): Promise<boolean> {
    
    const deletedExperience = await this.delete({ id, userId: user.id });

    if(deletedExperience.affected === 0){
      throw new NotFoundException(NOT_FOUND_EXPERIENCE);
    }
    
    return true;
  }
}