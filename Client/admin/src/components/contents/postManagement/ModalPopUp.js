import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';

const { TextArea } = Input;

class ModalPopUp extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    value: '',
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    const { visible, confirmLoading, value } = this.state;

    return (
      <>
        <Button type='primary' onClick={this.showModal}>
          Edit Post
        </Button>
        <Modal
          title='Edit Post'
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Input placeholder='Edit Title' autoSize />
          <div style={{ margin: '24px 0' }} />
          <Input
            placeholder='Edit Subtitle'
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <div style={{ margin: '24px 0' }} />
          <Input
            value={value}
            onChange={this.onChange}
            placeholder='Edit Image Link'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div style={{ margin: '24px 0' }} />
          <Input
            value={value}
            onChange={this.onChange}
            placeholder='Edit Exam Link'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div style={{ margin: '24px 0' }} />
          <TextArea
            value={value}
            onChange={this.onChange}
            placeholder='Edit Content'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Modal>
      </>
    );
  }
}

export default ModalPopUp;
