import { FileUpload } from 'graphql-upload';
import { IUpdateStrategy } from './upload-image.strategy';
import { RequestTimeoutException } from '@nestjs/common';
import { UploadImageTypes } from '../../enums/upload-image-types.enum';
import { UploadImageUtils } from '../../../utils/upload-image.utils';
import { User } from '../../../modules/user/user.entity';

export class UpdateImageContext{

  constructor(private uploadImageClass : IUpdateStrategy){}

  async executeUploadImage(
    idImage : number,
    type: UploadImageTypes, 
    image : FileUpload, 
    user : User
  ) : Promise<string> {
    const newImageName = UploadImageUtils.addCustomNameFileToImage(idImage, type, image);

    //UPDATE IMAGE ON DB
    const isUpdatedImage = await this.uploadImageClass.updateImage(idImage, newImageName, type, user); 

    /* Replace image on the server */
		if(isUpdatedImage){
			const isFileMoved = UploadImageUtils.moveFileToServer(type, newImageName, image);
			if(!isFileMoved){
        throw new RequestTimeoutException("Waiting Time is Over");
			}
    }	
    
		return newImageName;
  }

}