export interface UploadedFile {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export default interface Rich {
  files?: UploadedFile[];
}
