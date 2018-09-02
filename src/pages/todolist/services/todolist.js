import request from '../../../utils/request';

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}

// export function get_token(params){
//   return request("http://127.0.0.1:5000/api/v1.0/tokens",{
//     method:'POST',
//     body:{
//       email_or_token:"1845592662@qq.com",
//       password:"guo1996127"
//     },
//     headers:{
//       token:params
//     }
//   })
// };

export function api_todolist(params){
  //  console.log('service',params)
    const token = localStorage.getItem('token')
    return request("http://127.0.0.1:5000/api/v1.0/todolist",{
      method:'POST',
      body:params.query,
      headers:{
        token:token
      }
    })
}