import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uplad-picture',
  templateUrl: './uplad-picture.component.html',
  styleUrls: ['./uplad-picture.component.css']
})
export class UpladPictureComponent {

  /**
   * @ignore
   */
  currentFileName = 'Select file';

  newPicture: File;

  /**
   * @ignore
   */
  tempImage: any;

  /**
   * @ignore
   */
  @Input() imageUrl: string;
  @Input() showButton: boolean;
  /**
   * Action emitted when update picture Button is enabled.
   */
  @Output() updatePictureOperation: EventEmitter<File> = new EventEmitter();
  /**
   * Action emited only when change the image - Necessary when create project, service load picture on create.
   */
  @Output() changePicture: EventEmitter<File> = new EventEmitter();

  constructor() { }

  onChange(evt) {

    const { files, validity } = evt.target;

    if (validity.valid) {

      this.newPicture = files.item(0);

      if (this.newPicture.type.indexOf('image') < 0) {
        Swal.fire({
          title: 'Error!',
          text: 'Please, select only images',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.newPicture);
      reader.onloadend = () => this.tempImage = reader.result;

      this.changePicture.emit(this.newPicture);
    }
  }

  updateCurrentPicture(){
    this.updatePictureOperation.emit(this.newPicture);
  }
}
