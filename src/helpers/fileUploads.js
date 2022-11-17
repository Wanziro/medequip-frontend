import {imageUploadUrl} from '../constants/app';

export const uploadImage = imageObject => {
  return new Promise((resolve, reject) => {
    var url = imageUploadUrl;
    var photo =
      imageObject.path && imageObject.mime
        ? {
            uri: imageObject.path,
            type: imageObject.mime,
            name: 'imageObjectTobeUploaded.' + imageObject.mime.split('/')[1],
          }
        : {
            uri: imageObject.uri,
            type: imageObject.type,
            name: imageObject.name,
          };

    var formData = new FormData();
    formData.append('file', photo);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onprogress = function () {
      console.log('LOADING', xhr.status);
    };

    xhr.onload = function () {
      console.log(xhr.response);
      if (JSON.parse(xhr.response)) {
        const response = JSON.parse(xhr.response);
        if (response.type == 'success') {
          const {fileName} = response;
          resolve({status: response.type, fileName: fileName});
        } else {
          reject(response.type);
        }
      } else {
        reject('Failed to upload image');
      }
    };
    xhr.send(formData);
  });
};
