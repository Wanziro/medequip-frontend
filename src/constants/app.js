const APP_MODE = 'production'; //production or dev
const CONFIG = {
  dev: {
    // backendUrl: 'http://192.168.43.3:8080/api',
    // imageUrl: 'http://192.168.1.69/RN/cyizere/supplier/uploads/',

    backendUrl: 'http://172.31.34.64:8080/api',
    imageUrl: 'http://172.31.34.64/RN/cyizere/supplier/uploads/',
  },
  production: {
    backendUrl: 'https://medequip-backend.herokuapp.com/',
    // imageUrl: 'https://cyizere.rw/uploads/products/',
  },
};

module.exports = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  imageUrl: CONFIG[APP_MODE].imageUrl,
};
