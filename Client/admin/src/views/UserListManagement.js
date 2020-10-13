import React, { useEffect } from 'react'
import { Table, Tag, Space, Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteProfile } from '../actions/profile';



const UserListManagement = ({ profiles, user }) => {
  return (
    <div>Day la data</div>
  )
}

UserListManagement.propsTypes = {
  profiles: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  user: state.auth.user
})

export default connect(mapStateToProps)(UserListManagement);
