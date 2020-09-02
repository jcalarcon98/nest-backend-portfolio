import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillResolver } from './skill.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillRepository } from './skill.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillRepository]),
  ],
  providers: [
    SkillService, 
    SkillResolver
  ],
  exports: [
    SkillService
  ]
})
export class SkillModule {}
