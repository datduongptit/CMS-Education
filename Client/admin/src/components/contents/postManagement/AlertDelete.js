// import React from 'react';
// import { Modal, Button, Popconfirm } from 'antd';
// import { deletePost } from '../../../actions/post';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const AlertDelete = ({ deletePost, post: { posts }, auth }) => {
//   return (
//     <>
//       <Button
//         type='primary'
//         danger
//         onClick={() => deletePost(posts.map((post) => post._id))}
//       >
//         Delete
//       </Button>
//       {/* posts.map((post) => post._id) */}
//       {/* <Modal
//         visible={this.state.visible}
//         onOk={this.handleOk}
//         onCancel={this.handleCancel}
//       >
//         <h3>Sure to delete?</h3>
//       </Modal> */}
//     </>
//   );
// };

// AlertDelete.propTypes = {
//   deletePost: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   post: state.post,
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { deletePost })(AlertDelete);
