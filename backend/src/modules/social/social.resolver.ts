import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SocialService } from './social.service';
import { SocialType } from './social.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateOrUpdateSocialInput } from './input/create-or-update-social.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Social } from './social.entity';
import { IUpdateImage } from '../../common/interfaces/upload-image.interface';
import { UpdateImageInput } from '../../common/input/upload-image.input';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';

@Resolver('Social')
export class SocialResolver implements IUpdateImage {

  constructor(private socialService: SocialService){}

  @Query(returns => SocialType)
  @UseGuards(GqlAuthGuard)
  social(
    @Args('id') id: number,
    @GetUser() user : User 
  ){
    return this.socialService.getSocial(id, user);
  }


  @Mutation(returns => SocialType)
  @UseGuards(GqlAuthGuard)
  createSocial(
    @Args('createSocialInput') createSocialInput : CreateOrUpdateSocialInput,
    @Args({ name: 'picture', type: () => GraphQLUpload, nullable: true }) image: FileUpload,
    @GetUser() user : User
  ) : Promise<Social>{
    return this.socialService.createSocial(createSocialInput, image, user);
  }


  @Mutation(returns => SocialType)
  @UseGuards(GqlAuthGuard)
  async updateSocial(
    @Args('id') id: number,
    @Args('updateSocialInput') updateSocialInput: CreateOrUpdateSocialInput,
    @GetUser() user: User,
  ): Promise<Social> {
    return this.socialService.updateSocial(id, updateSocialInput, user);
  }


  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteSocial(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.socialService.deleteSocial(id, user);    
  }

  
  @Mutation(returns => Boolean, { name: `updateSocialImage` })
  @UseGuards(GqlAuthGuard)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @Args({ name: 'picture', type: () => GraphQLUpload }) image: FileUpload,
    @GetUser() user: User,
  ): Promise<boolean> {
    
    const { idImage } = updateImageInput;
    
    const context = new UpdateImageContext(this.socialService);

    return context.executeUploadImage(
      idImage,
      UploadImageTypes.SOCIAL,
      image,
      user,
    );
  }

}
