import { FileUpload } from 'graphql-upload';
import { UpdateImageInput } from '../input/upload-image.input'
import { User } from '../../modules/user/user.entity';

export interface IUpdateImage{
  
  updateImage(
    updateImageInput : UpdateImageInput,
    image: FileUpload,
    user : User 
  ) : Promise<boolean>;

}