import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Avatar } from 'antd';
import { addComment, getAllPosts } from '../../../actions/post';
const CommentItem = ({ postId, post: { posts } }) => {
  const data = [];
  posts.map((post) => {
    // console.log(post.comments);
    data.push({
      title: post.title,
      text: post.comments.text,
      avatar: post.comments.avatar,
      id: post._id,
    });
  });

  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        item.title,
        (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={item.text}
            />
          </List.Item>
        )
      )}
    />
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps)(CommentItem);
