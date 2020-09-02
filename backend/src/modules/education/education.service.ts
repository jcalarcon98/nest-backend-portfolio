import { Injectable } from '@nestjs/common';
import { EducationRepository } from './education.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateEducationInput } from './input/create-or-update-education.input';
import { User } from '../user/user.entity';
import { Education } from './education.entity';

@Injectable()
export class EducationService {
  
  constructor(
    @InjectRepository(EducationRepository)
    private educationRepository : EducationRepository
  ){}

  getEducation(id: number, user: User) : Promise<Education>{
    return this.educationRepository.getEducation(id, user);
  }

  createEducation(createEducationInput: CreateOrUpdateEducationInput, user: User): Promise<Education> {
    return this.educationRepository.createEducation(createEducationInput, user);
  }

  updateEducation(id: number, updateEducationInput: CreateOrUpdateEducationInput, user: User): Promise<Education> {
    return this.educationRepository.updateEducation(id, updateEducationInput, user);
  }

  deleteEducation(id: number, user: User): Promise<boolean> {
    return this.educationRepository.deleteEducation(id, user);
  }
  
    
}
