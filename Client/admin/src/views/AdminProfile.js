import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminDetail from '../components/contents/adminProfile/AdminDetail';
import AddProfile from '../components/contents/adminProfile/AddProfile';


const AdminProfile = ({ profile, error, loading }) => {
  return (
    (loading === false && error.status === 400) ?
      (
        <div>
          <AddProfile />
        </div>
      )
      :
      <Fragment>
        <div>
          You can edit your profile
        </div>
        <AdminDetail />
      </Fragment>
  );
}

AdminProfile.propsTypes = {
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool,
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  error: state.profile.error,
  loading: state.profile.loading
})

export default connect(mapStateToProps)(AdminProfile);
