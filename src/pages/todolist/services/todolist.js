import request from '../../../utils/request';

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}

export function get_user_info(){
    return request(`http://127.0.0.1:5000/api/test01`)
}