import { ListCount } from './../../common/interfaces/list-count.interface';
import { Repository, EntityRepository } from "typeorm";
import { Skill } from './skill.entity';
import { CreateOrUpdateSkillInput } from './input/create-or-update-skill.input';
import { User } from '../user/user.entity';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { ShareUtils } from '../../utils/share.utils';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_SKILL } from '../../common/messages/skill.message';
import { SkillUtils } from '../../utils/skill.utils';
import { PaginationInput } from '../../common/input/pagination.input';


@EntityRepository(Skill)
export class SkillRepository extends Repository<Skill>{
  async getSkill(id: number, user: User) : Promise<Skill> {
    
    const skill = await this.findOne({ id, userId: user.id });

    if (!skill) {
      throw new NotFoundException(NOT_FOUND_SKILL);
    }
    return skill; 
  }


  async getSkills(paginationInput: PaginationInput, user: User): Promise<ListCount> {
    const { skip, take } = paginationInput;

    const skillsArray: any[] = await this.findAndCount({
      where: {
        userId: user.id
      },
      skip,
      take,
    });

    const objectPresent: ListCount = {
      list: skillsArray[0],
      count: skillsArray[1],
    };

    return objectPresent;
  }

  
  async createSkill(createSkillInput: CreateOrUpdateSkillInput, user: User) : Promise<Skill>{
      
      let skill = new Skill();

      skill = SkillUtils.getUpdatedService(skill, createSkillInput);
    
      skill.user = user;

      return await skill.save();
  }

  async updateSkillPhoto(idImage: number, imageName: string, type: UploadImageTypes, user: User) : Promise<Skill> {
    
    const currentSkill : Skill = await this.getSkill(idImage, user);

    const currentPhoto = currentSkill.image;

    if(currentPhoto){
      ShareUtils.deleteIfExistsCurrentImage(type, currentPhoto);
    }

    currentSkill.image = imageName;

    return await currentSkill.save();
  }

  async updateSkill(id: number, updateSkillInput: CreateOrUpdateSkillInput, user: User): Promise<Skill> {
    let currentSkill = await this.getSkill(id, user);

    currentSkill = SkillUtils.getUpdatedService(currentSkill, updateSkillInput);

    return await currentSkill.save();
  }

  async deleteSkill(id: number, user: User): Promise<boolean> {
    
    const deleteSkill = await this.getSkill(id, user);
    
    if(deleteSkill.image){
      ShareUtils.deleteIfExistsCurrentImage(UploadImageTypes.SKILLS, deleteSkill.image);
    }
    return await deleteSkill.remove() ? true: false;
  }
  
} 