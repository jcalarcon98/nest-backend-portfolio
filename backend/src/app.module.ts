import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { LoadImageModule } from './modules/load-image/load-image.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ServicesModule } from './modules/services/services.module';
import { SkillModule } from './modules/skill/skill.module';
import { EducationModule } from './modules/education/education.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { SocialModule } from './modules/social/social.module';
import { PhoneModule } from './modules/phone/phone.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      uploads: {
        maxFieldSize: 10000000,
        maxFiles: 5,
      },
      introspection: true,  
      playground: true,
      context: ({ req }) => ({ req }),
      
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    LoadImageModule,
    UserModule,
    ProjectModule,
    ServicesModule,
    SkillModule,
    EducationModule,
    ExperienceModule,
    SocialModule,
    PhoneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
