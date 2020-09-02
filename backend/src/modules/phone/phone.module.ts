import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneResolver } from './phone.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneRepository } from './phone.repository';

@Module({
  imports : [
    TypeOrmModule.forFeature([PhoneRepository])
  ],
  providers: [
    PhoneService, 
    PhoneResolver
  ]
})
export class PhoneModule {}
