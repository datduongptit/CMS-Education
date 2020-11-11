import React, { useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Badge,
  Typography,
  Popconfirm,
  message,
} from 'antd';
import AlertDelete from './AlertDelete';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPosts, deletePost, getPost } from '../../../actions/post';
import Comments from './Comments';

const { Title } = Typography;
const PostTable = ({ post: { posts }, deletePost, getPost }) => {
  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  const confirm = (e) => {
    message.success('Click on Yes');
    return deletePost(e);
  };

  const columns = [
    {
      title: 'Lesson',
      dataIndex: 'Lesson',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
    },
    {
      title: 'Time',
      dataIndex: 'Time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure delete this task?'
            onConfirm={() => confirm(data.id)}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
          <Button type='primary'>
            <Link to='/edit-post'>Edit Post</Link>
          </Button>
          <Badge count={data.count}>
            <Button onClick={() => console.log(data.id)} block>
              <Link to='/discuss'><a >Link to Discuss</a></Link>
            </Button>
          </Badge>
        </>
      ),
    },
  ];

  let data = [];
  let count;
  posts.map((post, index) => {
    data.push({
      Lesson: post.title,
      Date: post.date.slice(0, 10),
      Time: post.date.slice(11, 19),
      key: index,
      count: post.comments.length,
      id: post._id,
    });
  });
  console.log(data.map((a) => a.id));
  // {count = data.map((a) => a.count)}

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
AlertDelete.propTypes = {
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, getPost })(PostTable);
