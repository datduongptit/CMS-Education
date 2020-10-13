import React, { useEffect } from 'react';
import { Table, Space, Button, Badge, Typography, Row, Col } from 'antd';
import AlertDelete from '../components/contents/postManagement/AlertDelete';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from '../components/Search/SearchBar';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions/post';
import PostTable from '../components/contents/postManagement/PostTable'

const { Title } = Typography;


const PostManagement = ({ getAllPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <>
      <Title style={{ textAlign: 'center' }} level={2}>
        Posts Management
      </Title>
      
      <Row>
        <Col offset={19} style={{ paddingBottom: '10px', textAlign: 'right' }}>
          <SearchBar />
        </Col>
      </Row>
      <PostTable/>
    </>
  );
};

PostManagement.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   post: state.post,
// });

export default connect(null, { getAllPosts })(PostManagement);
