import { Module } from '@nestjs/common';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';
import { ServiceRepository } from './service.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRepository])
  ],
  providers: [
    ServicesResolver, 
    ServicesService,
  ],
  exports: [
    ServicesService
  ]
})
export class ServicesModule {}
