import { Card, Layout, message, Space, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import userService from '../../services/user'
import fileService from '../../services/file'

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number>()
  const [fileCount, setFileCount] = useState<number>()

  useEffect(() => {
    userService
      .getCount()
      .then(data => setUserCount(data))
      .catch(() => message.error('数据获取失败'))
    fileService
      .getCount()
      .then(data => setFileCount(data))
      .catch(() => message.error('数据获取失败'))
  })

  return (
    <Layout style={{ margin: 24 }}>
      <Space>
        <Card style={{ width: 300 }}>
          <Statistic title='注册人数' value={userCount} />
        </Card>
        <Card style={{ width: 300 }}>
          <Statistic title='文件数量' value={fileCount} />
        </Card>
      </Space>
    </Layout>
  )
}

export default Dashboard
