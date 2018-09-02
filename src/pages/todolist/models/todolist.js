import * as todolistServer from '../services/todolist';
import {message} from 'antd'
import { create } from 'domain';

export default {
  namespace: 'todolist',
  state: {
  //  list:[{"title":"尤克里里","desp":"每天半小时指弹练习","s_time":"2018-08-01","e_time":"8012-08-01"},{"title":"日语学习","desp":"每天学一句日语","s_time":"2018-8-1","e_time":"8012-8-1"}]
    list:[]  
  },
  reducers: {
    save(state, { payload: { response } }) {
    //  console.log('model_save_resp:',response)
    //token过期的errorid,用于顶部导航栏的判断
      if(response.data.error.error_id === -99){
        localStorage.setItem('has_login',false)
      }
      if(response.data.error.error_id !== 0){
        message.error(String(response.data.error.reason))
      }
      else{
        const list = response.data.data
    //    console.log('model_save_resp1',list)
        return { ...state, list };
      }
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
    //  console.log('model',payload)
    //  const response = yield call(todolistServer.api_todolist,payload);
      const response = yield call(todolistServer.api_todolist,payload) ;
      yield put({ type: 'save', payload: { response } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/todolist') {
          const cookie = document.cookie
        //  console.log('cookie',cookie)
          if(cookie === ""){
            message.error('请登录')
        //    console.log('no token')
          }
          else{
            const token = cookie.split("=")[1].split("|")[0]
        //    console.log('token:',token) 
            localStorage.setItem('has_login',true)
            localStorage.setItem('token',token)
            dispatch({ type: 'fetch', payload: {mod:"list"} });
          }
        //  dispatch({ type: 'fetch', payload: token });
        }
      });
    },
  },
};