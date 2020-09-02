import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceRepository } from './experience.repository';
import { Experience } from './experience.entity';
import { User } from '../user/user.entity';
import { CreateOrUpdateExperienceInput } from './input/create-or-update-experience.input';

@Injectable()
export class ExperienceService {

  constructor(
    @InjectRepository(ExperienceRepository)
    private experienceRepository : ExperienceRepository
  ){}

  getExperience(id: number, user: User) : Promise<Experience>{
    return this.experienceRepository.getExperience(id, user);
  }

  createExperience(createExperienceInput: CreateOrUpdateExperienceInput, user: User): Promise<Experience> {
    return this.experienceRepository.createExperience(createExperienceInput, user);
  }

  updateExperience(id: number, updateExperienceInput: CreateOrUpdateExperienceInput, user: User): Promise<Experience> {
    return this.experienceRepository.updateExperience(id, updateExperienceInput, user);
  }

  deleteExperience(id: number, user: User): Promise<boolean> {
    return this.experienceRepository.deleteExperience(id, user);
  }
  
}
