import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationResolver } from './education.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationRepository } from './education.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationRepository])
  ],
  providers: [EducationService, EducationResolver]
})
export class EducationModule {}
