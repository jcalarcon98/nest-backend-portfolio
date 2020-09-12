import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { createWriteStream  } from 'fs';
import { FileUpload } from 'graphql-upload';

import { ShareUtils } from './share.utils';
import { SERVER_ERROR } from '../common/messages/shared.message';
import { NOT_VALID_EXTENSION_IMAGE, NOT_SELECT_IMAGE } from '../common/messages/upload-image.message';

export class UploadImageUtils{

    static checkImage(image : FileUpload) : string{

        if(!image || !image.filename){
            throw new BadRequestException(NOT_SELECT_IMAGE);
        }

        const extensionFile = UploadImageUtils.getExtensionFile(image.filename);        
        const isValidExtension = UploadImageUtils.isValidExtensionFile(extensionFile);
        
        if(!isValidExtension){
            throw new BadRequestException(NOT_VALID_EXTENSION_IMAGE);
        }
        return extensionFile;
    }

    
    static getExtensionFile(fileName : string) : string{

        const splitFileName = fileName.split('.');

        return splitFileName[splitFileName.length - 1]; 
    }

    static isValidExtensionFile(extensionFile) : boolean{
    
        const validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

        return validExtensions.indexOf(extensionFile) < 0 ? false : true;
    }


    static addCustomNameFileToImage(id: number, type: string, image: FileUpload){

        const extensionFile = UploadImageUtils.checkImage(image);

        const newName = `${id}-${new Date().getMilliseconds()}.${extensionFile}`;

        return newName;
    }

    static moveFileToServer(type : string, newNameFile : string, image: FileUpload){

        try{
            
            image.createReadStream().pipe(createWriteStream( ShareUtils.getImagePath(type, newNameFile)))
                                .on('error', (error)=> { return false;});

            return true;
            
        }catch(error){

            throw new InternalServerErrorException(SERVER_ERROR);
        }
    }
}