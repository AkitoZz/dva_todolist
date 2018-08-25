import { connect } from 'dva';
import {  List, Avatar, Button,Tooltip,Popconfirm } from 'antd';
import TodolistModal from './TodolistModal'
import styles from './Todolist.css'

//import { PAGE_SIZE } from '../constants';

function Todolist({ list }) {

    function createHandler(values){
        console.log('create',values,values.range[0].format('YYYY-MM-DD'))
    }

    function editHandler(values){
      console.log('edit',values)
    }

    function okhandlder(){
        console.log('ok')
    }

    function delhandler(){
        console.log('del')
    }

  console.log('1111',list)
  return (
    <div className={styles.normal}>  

    <div className={styles.create}>
        <TodolistModal record={{}} onOk={createHandler}>
        <Button type="primary">新建计划项</Button>
        </TodolistModal>
    </div>
    <List
    className="demo-loadmore-list"
//    loading={loading}
    itemLayout="horizontal"
//    loadMore={loadMore}
    dataSource={list}
    renderItem={item => (
      <List.Item actions={[<Popconfirm title="真的好好完成了吗" onConfirm={okhandlder}><a>今日打卡</a></Popconfirm>,
                            <TodolistModal record={item} onOk={editHandler}><a>编辑</a></TodolistModal>,
                            <Popconfirm title="真的要放弃吗" onConfirm={delhandler}> <a>删除</a></Popconfirm>]}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        //  title={<a href="https://ant.design">{item.name.last}</a>}
          title={<Tooltip title="业精于勤荒于嬉"><a>{item.title}</a></Tooltip>}
          description={item.desp}
        />
        <div>开始时间：{item.s_time}</div>
        <div>计划结束：{item.e_time}</div>
      </List.Item>
    )}
  />

    </div>

  );
}

function mapStateToProps(state) {
  const { list } = state.todolist;
  return {
    list
  };
}

export default connect(mapStateToProps)(Todolist);
