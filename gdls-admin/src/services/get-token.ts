import Cookies from 'js-cookie'

export const getToken = () => {
  return Cookies.get('gdls_token');
};

export const setToken = (token: string) => {
  return Cookies.set('gdls_token', token);
};

export const clearToken = () => {
  return Cookies.remove('gdls_token');
};
