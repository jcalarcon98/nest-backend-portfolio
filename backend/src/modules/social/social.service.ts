import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialRepository } from './social.repository';
import { User } from '../user/user.entity';
import { CreateOrUpdateSocialInput } from './input/create-or-update-social.input';
import { FileUpload } from 'graphql-upload';
import { Social } from './social.entity';
import { IUpdateStrategy } from '../../common/strategies/update-image/upload-image.strategy';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';

@Injectable()
export class SocialService implements IUpdateStrategy {

  constructor(
    @InjectRepository(SocialRepository)
    private socialRepository : SocialRepository
  ){} 


  getSocial(id: number, user: User) {
    return this.socialRepository.getSocial(id, user);
  }

  async createSocial(createSocialInput: CreateOrUpdateSocialInput, image: FileUpload, user: User): Promise<Social> {
		
		const savedSocial = await this.socialRepository.createSocial(createSocialInput, user);

    if(image){
      const context = new UpdateImageContext(this);

      await context.executeUploadImage(
        savedSocial.id,
        UploadImageTypes.SOCIAL,
        image,
        user
      );      
    }

    return savedSocial;
  }

  updateSocial(id: number, updateSocialInput: CreateOrUpdateSocialInput, user: User): Social | Promise<Social> {
    return this.socialRepository.updateSocial(id, updateSocialInput, user);  
  }
  
  deleteSocial(id: number, user: User): Promise<boolean> {
    return this.socialRepository.deleteSocial(id, user);
  }

  async updateImage(idImage: number, imageName: string, type: UploadImageTypes, user: User): Promise<boolean> {
    return await this.socialRepository.updateSocialPhoto(idImage, imageName, type, user) ? true : false;
  }

}
