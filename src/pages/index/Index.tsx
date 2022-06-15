import {
  DashboardOutlined,
  DownOutlined,
  GithubOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu, MenuProps } from 'antd'
import { Footer, Header } from 'antd/lib/layout/layout'
import { Key, ReactNode, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { MenuItem } from '../../types'
import Dashboard from '../dashboard/Dashboard'
import File from '../file/File'
import Personal from '../personal/Personal'
import User from '../user/User'

const getItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return { key, icon, children, label, type } as MenuItem
}

const items: MenuItem[] = [
  getItem('Dashboard', '', <DashboardOutlined />),
  getItem('列表页', 'sub2', <TableOutlined />, [
    getItem('用户管理', 'user'),
    getItem('文件管理', 'file'),
  ]),
]

const rootSubmenuKeys = ['sub1', 'sub2']

const defaultSelectedKeys = [
  sessionStorage.getItem('defaultSelectedKeys')
    ? sessionStorage.getItem('defaultSelectedKeys')!
    : '',
]

const Index = ({
  user,
  onSignout,
}: {
  user: string
  onSignout: () => void
}) => {
  const [openKeys, setOpenKeys] = useState([''])
  const navigate = useNavigate()

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const handleSiderClick = ({ key }: { key: Key }) => {
    sessionStorage.setItem('defaultSelectedKeys', key.toString())
    navigate(`/${key}`, { replace: true })
  }

  const handleDropdownClick = ({ key }: { key: Key }) => {
    if (Number(key) === 2) {
      onSignout()
    } else if (Number(key) === 1) {
      navigate('/personal', { replace: true })
    }
  }

  return (
    <Layout>
      <Layout.Sider
        className='background shadow-1-right'
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'auto',
          zIndex: 999,
        }}
      >
        <div className='logo' />
        <Menu
          mode='inline'
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={defaultSelectedKeys}
          items={items}
          onClick={handleSiderClick}
        />
      </Layout.Sider>
      <Layout>
        <Header
          className='background shadow-1-down'
          style={{
            height: 48,
            position: 'sticky',
            top: 0,
            zIndex: 99,
          }}
        >
          <Dropdown
            overlay={
              <Menu
                onClick={handleDropdownClick}
                items={[
                  { label: '个人中心', key: 1 },
                  { label: '退出', key: 2 },
                ]}
              />
            }
          >
            <Button type='text' style={{ float: 'right', height: 48 }}>
              {user}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Routes>
          <Route path='/user' element={<User />} />
          <Route path='/file' element={<File />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
        <Footer style={{ textAlign: 'center' }}>
          Github <GithubOutlined /> ZZZCNY
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Index
