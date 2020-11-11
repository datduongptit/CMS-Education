import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import Discuss from './Discuss';
import { getAllPosts, getPost } from '../../../actions/post';
const Comments = ({ getAllPosts, post: { posts, loading }, getPost }) => {
  posts.map((post) => {
    // console.log(post.comments);
  });
  return (
    <div>
      <CommentItem post={posts} />
      <Discuss postId={posts._id} />
    </div>
  );
};

Comments.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts, getPost })(Comments);
