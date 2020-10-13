import React from 'react';
import { Layout, Row, Col, Typography, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const HeaderCom = ({ isAuthenticated, logout }) => {

    if (!isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <Header className="header" >
            <Row style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Col xs={2} sm={4} md={6} lg={8} xl={4} >
                    <Title type="warning" level={3}>ADMIN</Title>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={16}>
                    <Title type="warning" level={3}>E LEARNING</Title>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ textAlign: "center" }}>
                    <Title level={3}><Button type="link" onClick={logout}>  <LogoutOutlined /> Logout</Button></Title>
                </Col>
            </Row>
        </Header>
    );
}

HeaderCom.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(HeaderCom);