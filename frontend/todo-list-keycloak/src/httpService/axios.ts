import axios from "axios";

const instanceAxios = (keycloak: any) => {
  const updateToken = async () => {
    if (keycloak.initialized && keycloak.authenticated && !keycloak.isTokenExpired()) {
      await keycloak.updateToken(5)
        .then((refreshed: string) => {
          if (refreshed) {
            console.log('Token refreshed' + refreshed);
          } else {
            console.log('Token not refreshed, valid for '
              + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
        })
        .catch(() => {
          console.error('Failed to refresh token');
        });
    }
  };
  
  const addTokenToHeaders = (config: any) => {
    const token = keycloak.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    console.log('config: ', config)
    return config;
  }
  
  const _axios = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  });

  _axios.interceptors.request.use(async (config) => {
    try {
      await updateToken();
      return addTokenToHeaders(config);
    } catch (error) {
      console.error('Error while adding token to headers: ', error);
      throw error;
    }
  });

  return _axios;
}

export default instanceAxios;

