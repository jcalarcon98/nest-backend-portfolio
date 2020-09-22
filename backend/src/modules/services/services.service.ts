import { Injectable } from '@nestjs/common';
import { CreaterOrUpdateServiceInput } from './input/create-or-update-service.input';
import { User } from '../user/user.entity';
import { ServiceRepository } from './service.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { FileUpload } from 'graphql-upload';
import { UpdateImageContext } from '../../common/strategies/update-image/update-image.context';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { IUpdateStrategy } from '../../common/strategies/update-image/upload-image.strategy';
import { PaginationInput } from '../../common/input/pagination.input';
import { ListCount } from '../../common/interfaces/list-count.interface';


@Injectable()
export class ServicesService implements IUpdateStrategy {
  
  constructor(
    @InjectRepository(ServiceRepository)
    private serviceRepository : ServiceRepository
  ){}
    
  getService(
    id: number, 
    user: User
  ) : Promise<Service> {
    return this.serviceRepository.getService(id, user);
  }


  async getServices(paginationInput: PaginationInput, user: User): Promise<ListCount> {
    return await this.serviceRepository.getServices(paginationInput, user);
  }

  async createService(
    createServiceInput: CreaterOrUpdateServiceInput, 
    image : FileUpload, 
    user: User
  ) : Promise<Service>{
    
    const savedService = await this.serviceRepository.createService(createServiceInput, user);

    if(image){
      const context = new UpdateImageContext(this);

      await context.executeUploadImage(
        savedService.id,
        UploadImageTypes.SERVICES,
        image,
        user
      );      
    }

    return savedService;
  }

  async updateImage(
    idImage: number, 
    imageName: string, 
    type: UploadImageTypes, 
    user: User
  ): Promise<boolean> {
    return await this.serviceRepository.updateServicePhoto(idImage, imageName, type, user) ? true : false;
  }


  updateService(id: number, updateServiceInput: CreaterOrUpdateServiceInput, user: User):  Promise<Service> {
    return this.serviceRepository.updateService(id, updateServiceInput, user);
  }
  

  deleteService(id: number, user: User): Promise<boolean> {
    return this.serviceRepository.deleteService(id, user);
  }


}
