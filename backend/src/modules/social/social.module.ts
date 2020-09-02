import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialResolver } from './social.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialRepository } from './social.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialRepository])
  ],
  providers: [
    SocialService, 
    SocialResolver
  ]
})
export class SocialModule {}
