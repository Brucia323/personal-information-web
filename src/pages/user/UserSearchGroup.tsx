import { Button, Col, Form, Input, Row, Space } from 'antd'
import { FC } from 'react'
import { UserSearchGroupType } from '../../types'

const UserSearchGroup: FC<UserSearchGroupType> = ({ onFinish, onReset }) => {
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields()
    onReset()
  }

  return (
    <Form onFinish={onFinish} form={form}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name='username' label='用户名'>
            <Input allowClear placeholder='请输入' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='nickname' label='昵称'>
            <Input allowClear placeholder='请输入' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='email' label='邮箱'>
            <Input allowClear placeholder='请输入' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='phone' label='电话'>
            <Input allowClear placeholder='请输入' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name='address' label='地址'>
            <Input allowClear placeholder='请输入' />
          </Form.Item>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={handleReset}>重置</Button>
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default UserSearchGroup
