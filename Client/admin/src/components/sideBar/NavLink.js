import React, { Fragment } from 'react';
import { Menu } from 'antd';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProfiles, getProfile } from '../../actions/profile';
import { getAllPosts } from '../../actions/post';


const NavLink = ({ getAllProfiles, getProfile, getAllPosts }) => {

  const callApi = (action) => {
    switch (action) {
      case 'User Management':
        return getAllProfiles();
      case 'Admin Profile':
        return getProfile();
      case 'Post Management':
        return getAllPosts();
      default:
        return null;
    }
  }


  return (
    <Fragment>
      <Menu
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub0']}
        mode='inline'
        theme='light'
      >
        {routes.map((child, index) => (
          <Menu.Item key={index} icon={child.icon}>
            <Link
              to={child.path}
              onClick={() => callApi(child.name_routes)}
            >
              {child.name_routes}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Fragment>
  );
}

NavLink.propsTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
}

export default connect(null, { getAllProfiles, getProfile, getAllPosts })(NavLink);
