import React, { Fragment } from 'react'
import { Form, Input, Button, Card, Col, Row, Image, Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { upDateProfile } from '../../../actions/profile'
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};


const AdminDetail = ({ user, profile, history, upDateProfile }) => {
    const onFinish = (values) => {
        console.log(values);
        upDateProfile(values.user, history)
    };
    if (profile === null) {
        return <Spin size="large" />
    }
    return (
        <Fragment>
            <div className="site-card-wrapper">
                <Row >
                    <Col span={12}>
                        <Card title={user.name} bordered={false}>
                            <Image
                                src={user.avatar}
                                width={200}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} >
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}

                    initialValue={profile.email}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'phone']}
                    label="Phone"
                    initialValue={profile.phone}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'fullName']}
                    label="Fullname"
                    initialValue={profile.fullName}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
                    <Button type="primary" htmlType="submit">
                        Changes Profile
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}

AdminDetail.propTypes = {
    user: PropTypes.object.isRequired,
    upDateProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth.user,
    profile: state.profile.profile,
})

export default withRouter(connect(mapStateToProps, { upDateProfile })(AdminDetail))
