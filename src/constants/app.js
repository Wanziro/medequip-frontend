const APP_MODE = 'dev'; //production or dev
const CONFIG = {
  dev: {
    // backendUrl: 'http://192.168.43.3:8080/api',

    backendUrl: 'http://172.31.34.64:8080/api',
    imageUrl: 'http://172.31.34.64/RN/medequip/uploads/',
    imageUploadUrl: 'http://172.31.34.64/RN/medequip/upload.php',
  },
  production: {
    backendUrl: 'https://medequip-backend.herokuapp.com/api',
  },
};

module.exports = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  imageUrl: CONFIG[APP_MODE].imageUrl,
  imageUploadUrl: CONFIG[APP_MODE].imageUploadUrl,
};
