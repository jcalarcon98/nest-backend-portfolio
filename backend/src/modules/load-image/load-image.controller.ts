import { Controller, Get, Res, Param, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Response } from 'express';

import { ShareUtils } from '../../utils/share.utils';

@Controller('')
export class LoadImageController {
  @Get('/:type/:image')
  getImage(
    @Param('type') type: string,
    @Param('image') image: string,
    @Res() res: Response,
  ) {
    let pathImage = resolve(ShareUtils.getImagePath(type, image));

    if (existsSync(pathImage)) {
      res.sendFile(pathImage);
    } else {
      throw new NotFoundException('No existe esta imagen');
    }
  }
}
