import { Repository, EntityRepository } from 'typeorm';
import { Social } from './social.entity';
import { User } from '../user/user.entity';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_SOCIAL } from '../../common/messages/social.message';
import { CreateOrUpdateSocialInput } from './input/create-or-update-social.input';
import { SocialUtils } from '../../utils/social.utils';
import { ShareUtils } from '../../utils/share.utils';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';

@EntityRepository(Social)
export class SocialRepository  extends Repository<Social>{

  async getSocial(id: number, user: User) {
    
    const social = await this.findOne({ id, userId: user.id });

    if (!social) {
      throw new NotFoundException(NOT_FOUND_SOCIAL);
    }
    return social; 
  }

  async createSocial(createSocialInput: CreateOrUpdateSocialInput, user: User) {
    let social = new Social();

    social = SocialUtils.getUpdatedSocial(social, createSocialInput);
  
    social.user = user;

    return await social.save();
	}
  
  async updateSocial(id: number, updateSocialInput: CreateOrUpdateSocialInput, user: User):  Promise<Social> { 
    
    let currentSocial = await this.getSocial(id, user);

    currentSocial = SocialUtils.getUpdatedSocial(currentSocial, updateSocialInput);

    return await currentSocial.save();
  }
  
  async deleteSocial(id: number, user: User): Promise<boolean> {
    
    const deleteSocial  = await this.getSocial(id, user);
    
    if(deleteSocial.image){
      ShareUtils.deleteIfExistsCurrentImage(UploadImageTypes.SOCIAL, deleteSocial.image);
    }
    return await deleteSocial.remove() ? true: false;
  }

  async updateSocialPhoto(idImage: number, imageName: string, type: UploadImageTypes, user: User) {
    const currentSocial = await this.getSocial(idImage, user);

    const currentPhoto = currentSocial.image;

    if(currentPhoto){
      ShareUtils.deleteIfExistsCurrentImage(type, currentPhoto);
    }

    currentSocial.image = imageName;

    return await currentSocial.save();
  }
  

} 