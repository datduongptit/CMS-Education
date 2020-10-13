import React from 'react';
import AddNewPost from '../src/views/AddNewPost';
import UserListManagement from '../src/views/UserListManagement';
import HomeAdmin from './views/HomeAdmin';
import PostManagement from './views/PostManagement';
import AdminProfile from './views/AdminProfile';
import PostContent from './components/contents/addNewPost/PostContent';

import {
  SolutionOutlined,
  FileAddOutlined,
  TeamOutlined,
  UserOutlined,
  CodeSandboxOutlined,
} from '@ant-design/icons';

const routes = [
  {
    path: '/home',
    component: <HomeAdmin />,
    name_routes: 'Home',
    icon: <CodeSandboxOutlined />,
  },
  {
    path: '/add-new-post',
    component: <PostContent />,
    name_routes: 'New Post',
    icon: <FileAddOutlined />,
  },
  {
    path: '/post-manager',
    component: <PostManagement />,
    name_routes: 'Post Management',
    icon: <SolutionOutlined />,
  },
  {
    path: '/mana-user-profile',
    component: <UserListManagement />,
    name_routes: 'User Management',
    icon: <TeamOutlined />,
  },
  {
    path: '/admin-profile',
    component: <AdminProfile />,
    name_routes: 'Admin Profile',
    icon: <UserOutlined />,
  },
];

export default routes;
