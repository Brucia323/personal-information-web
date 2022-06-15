import { Form, Input, Modal } from 'antd'
import React from 'react'
import { NewModalType } from '../../types'

const NewForm: React.FC<NewModalType> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields().then(values => {
      onCreate(values)
    })
  }

  return (
    <Modal
      visible={visible}
      title='新增'
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form preserve={false} layout='vertical' form={form}>
        <Form.Item
          name='username'
          label='用户名'
          required
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 1, message: '用户名至少1个字符' },
            { max: 30, message: '用户名不得超过30个字符' },
          ]}
        >
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item
          name='nickname'
          label='昵称'
          required
          rules={[
            { required: true, message: '请输入昵称' },
            { min: 1, message: '昵称至少1个字符' },
            { max: 30, message: '昵称不得超过30个字符' },
          ]}
        >
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='email' label='邮箱' rules={[{ type: 'email' }]}>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='phone' label='电话'>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='address' label='地址'>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NewForm
