import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository])],
  providers: [ProjectService, ProjectResolver],
  exports: [TypeOrmModule, ProjectService],
})
export class ProjectModule {}
