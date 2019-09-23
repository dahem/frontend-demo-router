import axios from 'axios';
import qs from 'qs';

export const fetchMany = (path, filter) => axios.get(`${path}?${qs.stringify(filter)}`);
export const fetchOne = (path, id) => axios.get(`${path}/${id}`);
export const create = (path, record) => axios.post(`${path}`, record);
export const update = (path, id, record) => axios.patch(`${path}/${id}`, record);
export const remove = (path, id) => axios.delete(`${path}/${id}`);

export const insertToken = () => {
  axios.interceptors.request.use((config) => Object.assign(config, {
    headers: {
      ...config.headers,
      'access-token': localStorage.getItem('access-token'),
    },
  }));
};
