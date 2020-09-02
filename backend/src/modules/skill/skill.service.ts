import { Injectable } from '@nestjs/common';
import { SkillRepository } from './skill.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateSkillInput } from './input/create-or-update-skill.input';
import { FileUpload } from 'graphql-upload';
import { User } from '../user/user.entity';
import { Skill } from './skill.entity';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { IUpdateStrategy } from '../../common/strategies/update-image/upload-image.strategy';
import { PaginationInput } from '../../common/input/pagination.input';

@Injectable()
export class SkillService implements IUpdateStrategy  {
  
  constructor(
    @InjectRepository(SkillRepository)
    private skillRepository : SkillRepository
  ){}
  

  getSkill(id: number, user: User) : Promise<Skill> {
    return this.skillRepository.getSkill(id, user);
  }



  async getSkills(paginationInput: PaginationInput): Promise<Skill[]> {
    return await this.skillRepository.getSkills(paginationInput);
  }


  async createSkill(createSkillInput: CreateOrUpdateSkillInput, image: FileUpload, user: User): Promise<Skill> {
    const savedSkill = await this.skillRepository.createSkill(createSkillInput, user);

    if(image){
      const context = new UpdateImageContext(this);

      await context.executeUploadImage(
        savedSkill.id,
        UploadImageTypes.SKILLS,
        image,
        user
      );      
    }

    return savedSkill;
  }

  async updateImage(idImage: number, imageName: string, type: UploadImageTypes, user: User): Promise<boolean> {
    return await this.skillRepository.updateSkillPhoto(idImage, imageName, type, user) ? true : false;
  }

  updateSkill(id: number, updateSkillInput: CreateOrUpdateSkillInput, user: User): Promise<Skill> {
    return this.skillRepository.updateSkill(id, updateSkillInput, user);
  }

  deleteSkill(id: number, user: User): Promise<boolean> {
    return this.skillRepository.deleteSkill(id, user);
  }
}
