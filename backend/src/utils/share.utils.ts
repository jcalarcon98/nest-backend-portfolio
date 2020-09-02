import { existsSync, unlinkSync  } from 'fs';
import { join } from 'path';

export class ShareUtils{

    static deleteIfExistsCurrentImage(type : string, currentImageName) : void{
        let currentPath = process.cwd() + `/uploads/${type}/${currentImageName}`;

        if(existsSync(currentPath)){
            unlinkSync(currentPath);
        }
    }

    static getImagePath(type : string, imageName : string) : string{
        return join(process.cwd() , `/uploads/${type}/${imageName}`);
    }

}   