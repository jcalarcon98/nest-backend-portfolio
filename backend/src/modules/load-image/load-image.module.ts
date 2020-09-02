import { Module } from '@nestjs/common';
import { LoadImageController } from './load-image.controller';

@Module({
  controllers: [LoadImageController],
})
export class LoadImageModule {}
