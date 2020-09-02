import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserSubscriber } from '../../common/subscribers/user.subscriber';
import { ProjectModule } from '../project/project.module';
import { UserController } from './user.controller';
import { SkillModule } from '../skill/skill.module';
import { ServicesModule } from '../services/services.module';

/**
 * Allows import and export all files for build User.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ProjectModule,
    SkillModule,
    ServicesModule   
  ],
  providers: [
    UserResolver, 
    UserService, 
    UserSubscriber
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
