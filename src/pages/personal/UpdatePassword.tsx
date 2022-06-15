import { Button, Form, Input, message, Modal } from 'antd'
import { useState } from 'react'
import userService from '../../services/user'

const UpdatePassword = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [form] = Form.useForm()

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values: { password: string; currentPassword: string }) => {
        userService.updatePassword(values.password).then(data => {
          if (data.error) {
            message.error(data.error)
          } else {
            message.success('修改成功')
            setVisible(false)
          }
        })
      })
    .catch(()=>message.error('修改失败'))
  }

  return (
    <>
      <Button type='text' onClick={() => setVisible(true)}>
        修改密码
      </Button>
      <Modal
        destroyOnClose
        visible={visible}
        title='修改密码'
        onCancel={() => setVisible(false)}
        onOk={handleOk}
      >
        <Form preserve={false} form={form}>
          <Form.Item
            label='新密码'
            name='password'
            required
            rules={[
              { required: true, message: '新密码不能为空' },
              { min: 5, message: '密码至少5个字符' },
              { max: 50, message: '密码不得超过50个字符' },
              { type: 'string' },
            ]}
          >
            <Input.Password placeholder='请输入' />
          </Form.Item>
          <Form.Item
            label='确认密码'
            name='currentPassword'
            dependencies={['password']}
            required
            rules={[
              {
                required: true,
                message: '请确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不同!'))
                },
              }),
            ]}
          >
            <Input.Password placeholder='请输入' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UpdatePassword
