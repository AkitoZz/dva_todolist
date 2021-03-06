import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
  console.log('header',localStorage.getItem("has_login"))
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        {/* <Link to="http://127.0.0.1:5000"><Icon type="home" />Home</Link> */}
        <a href="http://akazuki.cn"><Icon type="home" />Home</a>
      </Menu.Item>
      <Menu.Item key="/todolist">
        <Link to="/todolist"><Icon type="gift" />Todolist</Link>
      </Menu.Item>
      { 
        
        localStorage.getItem("has_login") === 0 ?
        <Menu.Item key="/">
          <a href="http://akazuki.cn/auth/logout"><Icon type="user" />logout</a>
        </Menu.Item>
        :
        <Menu.Item key="/">
        <a href="http://akazuki.cn/auth/login?next=%2Ftodolist"><Icon type="user" />login</a>
      </Menu.Item>
      }


      {/* <Menu.Item key="/umi">
        <a href="https://github.com/umijs/umi" target="_blank">umi</a>
      </Menu.Item>
      <Menu.Item key="/dva">
        <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item> */}
      
    </Menu>
  );
}

export default Header;