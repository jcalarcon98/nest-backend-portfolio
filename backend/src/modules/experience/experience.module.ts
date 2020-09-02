import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceResolver } from './experience.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceRepository } from './experience.repository';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ExperienceRepository])
  ],
  providers: [ExperienceService, ExperienceResolver]
})
export class ExperienceModule {}
