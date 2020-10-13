import React, { useState } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, getAllPosts } from '../../../actions/post';
const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 16,
  },
};

const Discuss = ({ postId, addComment, post: { posts } }) => {
  const onFinish = (values) => {
    addComment(postId, values.comment);
  };
  // const [text, setText] = useState('')
  return (
    <div>
      <Form {...layout} name='nest-messages' onFinish={onFinish}>
        <Form.Item name={['comment', 'comments']} label='Add comment'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Discuss.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addComment })(Discuss);
