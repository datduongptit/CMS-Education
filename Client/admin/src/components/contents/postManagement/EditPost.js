import React, { Component } from 'react';
import { Button, Input, Row, Col, Typography } from 'antd';
const { Title } = Typography;
export default class EditPost extends Component {
  render() {
    return (
      <>
        <Row>
          <Col span={24} offset={10}>
            <Title level={2}>
              <Title level={2}>Edit Post</Title>
            </Title>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={6}>
            <Input placeholder="Lesson's Title" />
          </Col>
          <Col span={6}>
            <Input placeholder='Exam' />
          </Col>
          <Col span={5} offset={7} style={{ textAlign: 'right' }}>
            <Button
              onClick={this.saveChange}
              type='primary'
              style={{ width: '95%' }}
            >
              Save the change
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
