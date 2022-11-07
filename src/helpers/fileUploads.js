import {backendUrl} from '../constants/app';

export const uploadProductImage = (file, productId) => {
  return new Promise((resolve, reject) => {
    var url = backendUrl + '/uploadProductImage';
    var photo = {
      uri: file.path,
      type: file.mime,
      name: 'fileTobeUploaded.' + file.mime.split('/')[1],
    };

    var formData = new FormData();
    formData.append('file', photo);
    formData.append('productId', productId);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onprogress = function () {
      console.log('LOADING', xhr.status);
    };

    xhr.onload = function () {
      console.log(xhr.response);
      const response = JSON.parse(xhr.response);
      if (response.type == 'success') {
        const {fileName} = response;
        resolve({status: response.type, uploadeFileName: fileName});
      } else {
        reject(response.type);
      }
    };
    xhr.send(formData);
  });
};
