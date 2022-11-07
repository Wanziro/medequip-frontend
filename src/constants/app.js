const APP_MODE = 'dev'; //production or dev
const CONFIG = {
  dev: {
    // backendUrl: 'http://192.168.43.3:8080/api',
    // imageUrl: 'http://192.168.1.69/RN/cyizere/supplier/uploads/',

    backendUrl: 'http://172.31.34.64:8080/api',
    imageUrl: 'http://172.31.34.64/RN/cyizere/supplier/uploads/',
  },
  production: {
    // backendUrl: 'https://cyizere.rw/api/supplier',
    // imageUrl: 'https://cyizere.rw/uploads/products/',
  },
};

module.exports = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  imageUrl: CONFIG[APP_MODE].imageUrl,
};
