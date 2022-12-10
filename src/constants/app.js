const APP_MODE = 'dev';
// const APP_MODE = 'production';
const CONFIG = {
  dev: {
    // backendUrl: 'http://192.168.43.3:8080/api',
    // imageUrl: 'http://192.168.43.3/RN/medequip/uploads/',
    // imageUploadUrl: 'http://192.168.43.3/RN/medequip/upload.php',

    backendUrl: 'http://172.31.34.64:8080/api',
    imageUrl: 'http://172.31.34.64/RN/medequip/uploads/',
    imageUploadUrl: 'http://172.31.34.64/RN/medequip/upload.php',
  },
  production: {
    // backendUrl: 'https://medequip-backend.herokuapp.com/api',
    backendUrl: 'https://mobile-mers-backend.onrender.com/api',
    imageUrl: 'https://autoexpertsrwanda.com/images/ic2/uploads/',
    imageUploadUrl: 'https://autoexpertsrwanda.com/images/ic2/upload.php',
  },
};

module.exports = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  imageUrl: CONFIG[APP_MODE].imageUrl,
  imageUploadUrl: CONFIG[APP_MODE].imageUploadUrl,
};
