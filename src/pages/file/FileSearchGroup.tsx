import { Button, Col, Form, Input, Row, Space } from 'antd'
import { FC } from 'react'
import { FileSearchGroupType } from '../../types'

const FileSearchGroup: FC<FileSearchGroupType> = ({ onFinish, onReset }) => {
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields()
    onReset()
  }

  return (
    <Form onFinish={onFinish} form={form} initialValues={{ filetype: 'all' }}>
      <Row gutter={23}>
        <Col span={8}>
          <Form.Item name='filename' label='文件名'>
            <Input placeholder='请输入' allowClear />
          </Form.Item>
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
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

export default FileSearchGroup
