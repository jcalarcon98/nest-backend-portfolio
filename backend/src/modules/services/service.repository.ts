import { ListCount } from './../../common/interfaces/list-count.interface';
import { Repository, EntityRepository } from 'typeorm';
import { Service } from './service.entity';
import { CreaterOrUpdateServiceInput } from './input/create-or-update-service.input';
import { User } from '../user/user.entity';
import { UploadImageTypes } from '../../common/enums/upload-image-types.enum';
import { ShareUtils } from '../../utils/share.utils';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_SERVICE } from '../../common/messages/service.message';
import { ServiceUtils } from '../../utils/service.utils';
import { PaginationInput } from '../../common/input/pagination.input';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service>{
  
  async getService(id: number, user: User): Promise<Service> {

    const service = await this.findOne({ id, userId: user.id });

    if (!service) {
      throw new NotFoundException(NOT_FOUND_SERVICE);
    }
    return service; 
  }

  async getServices(paginationInput: PaginationInput): Promise<any> {
    const { skip, take } = paginationInput;

    const servicesArray: any[] = await this.findAndCount({
      skip,
      take,
    });

    const objectPresent: ListCount = {
      list: servicesArray[0],
      count: servicesArray[1],
    };

    return objectPresent;
  }
  
  async createService(createServiceInput: CreaterOrUpdateServiceInput, user: User) : Promise<Service> {
    
      let service = new Service();

      service = ServiceUtils.getUpdatedService(service, createServiceInput);
    
      service.user = user;

      return await service.save();
  }

  async updateServicePhoto(
    idImage: number, 
    imageName: string, 
    type: UploadImageTypes, 
    user: User
  ) : Promise<Service> {
    
    const currentService = await this.getService(idImage, user);

    const currentPhoto = currentService.image;

    if(currentPhoto){
      ShareUtils.deleteIfExistsCurrentImage(type, currentPhoto);
    }

    currentService.image = imageName;

    return await currentService.save();
  }
  

  async updateService(id: number, updateServiceInput: CreaterOrUpdateServiceInput, user: User): Promise<Service> {
    
    let currentService = await this.getService(id, user);

    currentService = ServiceUtils.getUpdatedService(currentService, updateServiceInput);

    return await currentService.save();
  }
  
  async deleteService(id: number, user: User): Promise<boolean> {
    
    const deleteService  = await this.getService(id, user);
    
    if(deleteService.image){
      ShareUtils.deleteIfExistsCurrentImage(UploadImageTypes.SERVICES, deleteService.image);
    }
    return await deleteService.remove() ? true: false;
  }
}