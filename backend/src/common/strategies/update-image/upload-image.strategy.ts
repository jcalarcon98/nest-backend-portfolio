import { UploadImageTypes } from '../../enums/upload-image-types.enum';
import { User } from '../../../modules/user/user.entity';

export interface IUpdateStrategy{

  updateImage(
    idImage : number,
    imageName: string,  
    type : UploadImageTypes,
    user : User  
  ) : Promise<boolean>; 

}   