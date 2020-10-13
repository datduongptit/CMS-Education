import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, Image, Spin } from 'antd';
const { Title } = Typography;



const HomeAdmin = ({ auth }) => {
  return (auth.user !== null ?
    (
      <Fragment>
        <Title level={2}>Wellcome {auth.user.name}</Title>
        <Image
          src={auth.user.avatar}
          width={200}
        />
      </Fragment>
    ) : <Spin size="large" />)
}


HomeAdmin.propsTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(HomeAdmin);
