import _ from 'lodash';

export const hasToken = () => {
  const token = localStorage.getItem('access-token');
  return !_.isEmpty(token);
};

export const setToken = () => {
  localStorage.setItem('access-token', '435435435435435345');
};

export const clear = () => {
  localStorage.clear();
};
