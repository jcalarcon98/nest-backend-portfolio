import { Service } from '../modules/services/service.entity';
import { CreaterOrUpdateServiceInput } from '../modules/services/input/create-or-update-service.input';

export class ServiceUtils{


  static getUpdatedService(currentService : Service, updateServiceInput : CreaterOrUpdateServiceInput) : Service{
    
    const { title, description,} = updateServiceInput;
    
    currentService.title = title;
    currentService.description = description;

    return currentService;
  }
  

}   