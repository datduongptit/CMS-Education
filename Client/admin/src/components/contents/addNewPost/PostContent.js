import React, { Component } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addPost } from '../../../actions/post';

const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 16,
  },
};

const PostContent = ({ addPost, post: { posts } }) => {
  const onFinish = (values) => {
    addPost(values.post);
  };
  return (
    <>
      <Form {...layout} name='nest-messages' onFinish={onFinish}>
        <Form.Item name={['post', 'posts']} label='Add Post'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

PostContent.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(PostContent);
