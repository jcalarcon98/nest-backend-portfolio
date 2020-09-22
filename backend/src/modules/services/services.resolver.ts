import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { CreaterOrUpdateServiceInput } from './input/create-or-update-service.input';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { ServiceType } from './types/service.type';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateImageInput } from '../../common/input/upload-image.input';
import { IUpdateImage } from '../../common/interfaces/upload-image.interface';
import { UpdateImageContext } from 'src/common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { ServiceCountType } from './types/service-count.type';
import { PaginationInput } from '../../common/input/pagination.input';

@Resolver('Services')
export class ServicesResolver implements IUpdateImage {

  constructor(private serviceService : ServicesService){}
  
  @Query(returns => ServiceType)
  @UseGuards(GqlAuthGuard)
  service(
    @Args('id') id: number,
    @GetUser() user : User 
  ){
    return this.serviceService.getService(id, user);
  }

  @Query(returns => ServiceCountType)
  @UseGuards(GqlAuthGuard)
  services(
    @Args('paginationInput') paginationInput: PaginationInput,
    @GetUser() user: User
  ){
    return this.serviceService.getServices(paginationInput, user);
  }

  @Mutation(returns => ServiceType)
  @UseGuards(GqlAuthGuard)
  createService(
    @Args('createServiceInput') createServiceInput : CreaterOrUpdateServiceInput,
    @Args({ name: 'picture', type: () => GraphQLUpload, nullable: true }) image: FileUpload,
    @GetUser() user : User
  ) : Promise<Service>{
    return this.serviceService.createService(createServiceInput, image, user);
  }


  @Mutation(returns => ServiceType)
  @UseGuards(GqlAuthGuard)
  async updateService(
    @Args('id') id: number,
    @Args('updateServiceInput') updateServiceInput: CreaterOrUpdateServiceInput,
    @GetUser() user: User,
  ): Promise<Service> {
    return this.serviceService.updateService(id, updateServiceInput, user);
  }


  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteService(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.serviceService.deleteService(id, user);    
  }

  
  @Mutation(returns => Boolean, { name: `updateServiceImage` })
  @UseGuards(GqlAuthGuard)
  async updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @Args({ name: 'picture', type: () => GraphQLUpload }) image: FileUpload,
    @GetUser() user: User,
  ): Promise<string> {
    
    const { idImage } = updateImageInput;
    
    const context = new UpdateImageContext(this.serviceService);

    return context.executeUploadImage(
      idImage,
      UploadImageTypes.SERVICES,
      image,
      user,
    );
  }
}
