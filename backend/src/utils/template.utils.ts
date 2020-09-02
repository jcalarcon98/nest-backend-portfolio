import * as handlebars from 'handlebars';
import { readFileSync  } from 'fs';

export class TemplateUtils{

  static getTemplate(filePath: string, data : any){

    const source = readFileSync(filePath, 'utf-8');
    const template = handlebars.compile(source);
    return template(data);
  
  }
  
}