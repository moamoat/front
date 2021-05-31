import MapContainer from './components/MapContainer'
import Popup from './components/Popup'
import styles from "./Css/App.module.css"
import './Css/Case.css'
import 'antd/dist/antd.css';
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

function App() {
  const { SubMenu } = Menu;
  const { Header, Content } = Layout;


  return (
    <div className="App">
      <Popup/>
      <Layout>
        <Header className="header">
          {/* 제목 부분 */}
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">모아모아</Menu.Item>
        
              
          </Menu>
        </Header>
        <Content style={{ padding: '0 30px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" >
            {/* <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1">option1</Menu.Item>
                  
                </SubMenu>
              </Menu>
            </Sider> */}
            <Content style={{ padding: '0 24px', minHeight: 580 }}>
              {/* 전체적인 넓이 */}
              <div className={styles.width} >
                <MapContainer />
                
              </div>
            </Content>
          </Layout>
        </Content>

      </Layout>

      {/* <div className={styles.height}>
        <SearchPlace></SearchPlace>
      </div> */}
      {/* SearchPlace를 사용함으로써 지도요소들이 한번더 불러와짐 보이진 않는데 */}
    </div>
  );
}

export default App;