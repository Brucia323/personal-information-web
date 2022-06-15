import { Button, Card, Col, Form, Input, Layout, message, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import userService from '../../services/user'
import { UserType, UserTypeExcludeId } from '../../types'
import UpdatePassword from './UpdatePassword'

const Personal = () => {
  const [user, setUser] = useState<UserType>()
  const [form] = Form.useForm()

  useEffect(() => {
    userService.getOne().then(data => setUser(data))
  }, [])

  useEffect(() => {
    form.setFieldsValue(user)
  })

  const handleSubmit = async (values: UserTypeExcludeId) => {
    const id = user?.id
    const newObject = { ...values, id: user?.id! }
    try {
      if (id) {
        userService.update(id, newObject)
        message.success('提交成功')
      }
    } catch {
      message.error('提交失败')
    }
  }

  return (
    <Layout>
      <Content className='background' style={{ padding: 24, margin: 24 }}>
        <Card
          title='个人信息'
          style={{ height: '100%' }}
          extra={<UpdatePassword />}
        >
          <Form initialValues={user} form={form} onFinish={handleSubmit}>
            <Form.Item
              name='username'
              label='用户名'
              wrapperCol={{ span: 8 }}
              labelCol={{ span: 3 }}
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
              wrapperCol={{ span: 8 }}
              labelCol={{ span: 3 }}
              rules={[
                { required: true, message: '昵称不能为空' },
                { min: 1, message: '昵称至少1个字符' },
                { max: 30, message: '昵称不得超过30个字符' },
              ]}
            >
              <Input placeholder='请输入' allowClear />
            </Form.Item>
            <Form.Item
              name='email'
              label='邮箱'
              wrapperCol={{ span: 8 }}
              labelCol={{ span: 3 }}
            >
              <Input placeholder='请输入' allowClear />
            </Form.Item>
            <Form.Item
              name='phone'
              label='电话'
              wrapperCol={{ span: 8 }}
              labelCol={{ span: 3 }}
            >
              <Input placeholder='请输入' allowClear />
            </Form.Item>
            <Form.Item
              name='address'
              label='地址'
              wrapperCol={{ span: 8 }}
              labelCol={{ span: 3 }}
            >
              <Input placeholder='请输入' allowClear />
            </Form.Item>
            <Row>
              <Col offset={3}>
                <Button htmlType='submit' type='primary'>
                  提交
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Content>
    </Layout>
  )
}

export default Personal
