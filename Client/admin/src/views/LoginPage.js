import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import AlertWarning from './Alert';
import { Redirect } from 'react-router-dom';

import {
  Typography,
  Card,
  Form,
  Input,
  Button,
} from 'antd';


const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 20 },
};

const LoginPage = ({ login, isAuthenticated }) => {
  const onFinish = (values) => {
    login(values.account, values.password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return isAuthenticated ? <Redirect to="/home" /> : (
    <div
      style={{
        height: '100vh',
        width: '100%',
        background:
          'linear-gradient(45deg, rgba(178,44,204,1) 28%, rgba(252,70,107,1) 89%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '50%',
          height: '60vh',
          borderRadius: '15px',
          boxShadow: '-1px 2px 18px 0px rgba(15,15,15,0.43)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title style={{
          textAlign: 'center'
        }} level={1}>
          LOGIN
        </Title>
        <div style={{ width: 500 }}>
          <Form
            {...layout}
            name='basic'
            initialValues={{
              remember: true,
            }}
            id='myForm'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='Account'
              name='account'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input
                style={{
                  width: '50%',
                  height: 50,
                  borderRadius: 10,
                }}
                name='account'
              />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                style={{
                  width: '50%',
                  height: 50,
                  borderRadius: 10,
                }}
                name='password'
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                style={{
                  width: '50%',
                  height: 50,
                  background:
                    'linear-gradient(45deg, rgba(178,44,204,1) 36%, rgba(227,48,103,1) 70%)',
                  borderRadius: 10,
                  color: '#fff',
                }}
                form='myForm'
                key='submit'
                htmlType='submit'
              >
                Login
            </Button>
              <AlertWarning />
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div >
  )
}


LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(LoginPage);
