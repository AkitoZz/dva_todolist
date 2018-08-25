import get_user_info from '../services/todolist';

export default {
  namespace: 'todolist',
  state: {
    list:[{"title":"尤克里里","desp":"每天半小时指弹练习","s_time":"2018-08-01","e_time":"8012-08-01"},{"title":"日语学习","desp":"每天学一句日语","s_time":"2018-8-1","e_time":"8012-8-1"}]
  },
  reducers: {
    save(state, { payload: { response } }) {
      return { ...state, response };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(get_user_info);
      yield put({ type: 'save', payload: { response } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/todolist') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};