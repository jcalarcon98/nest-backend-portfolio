import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/user/user.entity';
import { UserSubscriber } from '../common/subscribers/user.subscriber';
import { Project } from '../modules/project/project.entity';

import * as config from 'config';
import { Service } from '../modules/services/service.entity';
import { Skill } from '../modules/skill/skill.entity';
import { Education } from '../modules/education/education.entity';
import { Experience } from 'src/modules/experience/experience.entity';
import { Social } from '../modules/social/social.entity';
import { Phone } from '../modules/phone/phone.entity';

const dbConfig = config.get('database');
/**
 * Database configuration
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DATABASE_HOST || dbConfig.host,
  port: process.env.DATABASE_PORT || dbConfig.port,
  username: process.env.DATABASE_USER || dbConfig.username,
  password: process.env.DATABASE_PASSWORD || dbConfig.password,
  database: process.env.DATABASE_NAME || dbConfig.name,
  entities: [
    User, 
    Project, 
    Service, 
    Skill,
    Education,
    Experience,
    Social,
    Phone
  ],
  synchronize: dbConfig.synchronize,
  subscribers: [UserSubscriber],
};
