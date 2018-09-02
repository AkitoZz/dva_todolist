import { Component } from 'react';
import { Modal, Form, Input,DatePicker } from 'antd';
import moment from 'moment'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class TodolistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['id'] = this.props.record.id
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id,title, desp, s_time, e_time } = this.props.record;
  //  console.log("title:",title)
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title === undefined ? "新建" : "编辑"}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler} id={id}>
            <FormItem
              {...formItemLayout}
              label="待办事项"
            >
              {
                getFieldDecorator('title', {
                  initialValue: title,
                  rules:[{required:true}] 
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="具体内容"
            >
              {
                getFieldDecorator('desp', {
                  initialValue: desp,
                  rules:[{required:true}]
                })(<Input.TextArea />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="持续时间"
            >
            {
              getFieldDecorator('range', {
                initialValue:[moment(s_time),moment(e_time)] ,
                rules: [{ type: 'array', required: true, message: 'Please select time!' }],
              })(<RangePicker showTime format="YYYY-MM-DD" />)
            }
        </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(TodolistModal);