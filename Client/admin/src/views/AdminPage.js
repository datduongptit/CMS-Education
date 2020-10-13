import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import NavLink from '../components/sideBar/NavLink';
import HeaderCom from '../components/header/HeaderCom';
import Discuss from '../components/contents/postManagement/Discuss';
import EditPost from '../components/contents/postManagement/EditPost';
import { connect } from 'react-redux';
import Comments from '../components/contents/postManagement/Comments';
const { Content, Sider } = Layout;

const AdminPage = (props) => {
  const { routes } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderCom />
      <Layout>
        <Sider theme='light'>
          <NavLink />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className='site-layout-background'
            style={{
              padding: 20,
              margin: 0,
            }}
          >
            <Switch>
              {routes.map((child, index) => (
                <Route path={child.path} key={index}>
                  {child.component}
                </Route>
              ))}
              <Route path='/edit-post'>
                <EditPost />
              </Route>
              <Route path='/discuss'>
                <Comments />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default connect()(AdminPage);
