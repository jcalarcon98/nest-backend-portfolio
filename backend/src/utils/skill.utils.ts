import { Skill } from '../modules/skill/skill.entity';
import { CreateOrUpdateSkillInput } from '../modules/skill/input/create-or-update-skill.input';

export class SkillUtils{

  static getUpdatedService(currentSkill : Skill, updateSkillInput : CreateOrUpdateSkillInput) : Skill{
    
    const { name, level, description,} = updateSkillInput;
    
    currentSkill.name = name;
    currentSkill.level = level;
    currentSkill.description = description

    return currentSkill;
  }
  

}   