import { FileUpload } from 'graphql-upload';
import { User } from '../../../modules/user/user.entity';
import { UploadImageTypes } from '../../enums/upload-image-types.enum';
import { UploadImageUtils } from '../../../utils/upload-image.utils';
import { RequestTimeoutException } from '@nestjs/common';
import { IUpdateStrategy } from './upload-image.strategy';

export class UpdateImageContext{

  private uploadImageClass : IUpdateStrategy;

  constructor(uploadImageClass : IUpdateStrategy){
    this.uploadImageClass = uploadImageClass;
  }

  async executeUploadImage(
    idImage : number,
    type: UploadImageTypes, 
    image : FileUpload, 
    user : User
  ) : Promise<boolean> {
    const newImageName = UploadImageUtils.addCustomNameFileToImage(idImage, type, image);

    //UPDATE IMAGE ON DB
    const isUpdatedImage = await this.uploadImageClass.updateImage(idImage, newImageName, type, user); 

    /* Reemplazar imagen en el servidor */
		if(isUpdatedImage){
			const isFileMoved = UploadImageUtils.moveFileToServer(type, newImageName, image);
			if(!isFileMoved){
        //TODO CHANGE MESSAGE.
				throw new RequestTimeoutException("Se agoto el tiempo de espera");
			}
    }	
    
		return true;
  }

}