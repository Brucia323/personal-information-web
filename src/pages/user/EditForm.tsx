import { Form, Input, message, Modal } from 'antd'
import React from 'react'
import { EditModalType, UserTypeExcludeId } from '../../types'

const EditForm: React.FC<EditModalType> = ({
  visible,
  onEdit,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form
      .validateFields()
      .then((values: UserTypeExcludeId) => {
        const user = { id: initialValues.id, ...values }
        form.resetFields()
        onEdit(user)
      })
      .catch(() => message.error('修改失败'))
  }

  return (
    <Modal
      visible={visible}
      title='编辑'
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        initialValues={initialValues}
        preserve={false}
        layout='vertical'
        form={form}
      >
        <Form.Item
          name='username'
          label='用户名'
          required
          rules={[
            { required: true, message: '用户名不能为空' },
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
            { required: true, message: '昵称不能为空' },
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

export default EditForm
