import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxImageCompressService} from 'ngx-image-compress';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  standalone: true,
  imports: [
    MatProgressBar,
    NgIf,
    MatButton,
    MatTooltip,
  ],
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnChanges{
  @Input() statementId: string | undefined;
  @Input() thumbnailSrc: string | undefined;
  @Output() pictureUploaded = new EventEmitter<string>();
  uploading = false;
  localPreview: string | undefined;
  originalSizeKB?: number;
  compressedSizeKB?: number;

  constructor(private http: HttpClient, private imageCompress: NgxImageCompressService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['thumbnailSrc']) {
      if (!this.thumbnailSrc) {
        this.localPreview = undefined;  // clear preview when no image
      } else {
        this.localPreview = this.thumbnailSrc;
      }
    }
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.uploading = true;
    this.originalSizeKB = +(file.size / 1024).toFixed(2);

    const originalSizeKB = file.size / 1024;
    console.log(`Original size: ${originalSizeKB.toFixed(2)} KB`);

    const reader = new FileReader();

    reader.onload = async (e: any) => {
      try {
        const imageDataUrl = e.target.result;
        const compressedImage = await this.imageCompress.compressFile(imageDataUrl, -1, 50, 50);
        const compressedBlob = this.dataURLtoBlob(compressedImage);
        const compressedSizeKB = compressedBlob.size / 1024;
        this.compressedSizeKB = +(compressedBlob.size / 1024).toFixed(2);
        this.localPreview = compressedImage;
        this.pictureUploaded.emit(compressedImage);
      } catch (err) {
        console.error('Compression error', err);
      } finally {
        this.uploading = false;
      }
    };

    reader.readAsDataURL(file);
  }


  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  }
}
