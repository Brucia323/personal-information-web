import { Layout, message, PageHeader, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { Key, useCallback, useEffect, useState } from 'react'
import userService from '../../services/user'
import { UserType, UserTypeExcludeId } from '../../types'
import ButtonGroup from './ButtonGroup'
import EditForm from './EditForm'
import UserSearchGroup from './UserSearchGroup'
import UserTable from './UserTable'

const User = () => {
  const [selection, setSelection] = useState<Key[]>([])

  const handleSelection = (keys: Key[]) => {
    setSelection(keys)
  }

  const [data, setData] = useState<UserType[]>([])

  useEffect(() => {
    userService
      .getAll()
      .then(d => setData(d))
      .catch(e => {
        message.error('数据获取失败')
        console.error(e)
      })
  }, [])

  const reload = async () => {
    try {
      const data = await userService.getAll()
      setData(data)
    } catch {
      message.error('数据获取失败')
    }
  }

  const clearSelection = useCallback(() => {
    setSelection([])
  }, [])

  const [filterData, setFilterData] = useState<UserType[]>([])

  useEffect(() => {
    setFilterData(data)
  }, [data])

  const handleSearch = (values: UserTypeExcludeId) => {
    let objectData: UserType[] = data
    if (values.username && values.username !== '') {
      objectData = objectData.filter(
        p => p.username.search(new RegExp(values.username, 'i')) !== -1
      )
    }
    if (values.nickname && values.nickname !== '') {
      objectData = objectData.filter(
        p => p.nickname.search(new RegExp(values.nickname, 'i')) !== -1
      )
    }
    if (values.email && values.email !== '') {
      objectData = objectData.filter(
        p => p.email.search(new RegExp(values.email, 'i')) !== -1
      )
    }
    if (values.phone && values.phone !== '') {
      objectData = objectData.filter(
        p => p.phone.search(new RegExp(values.phone, 'i')) !== -1
      )
    }
    if (values.address && values.address !== '') {
      objectData = objectData.filter(
        p => p.address.search(new RegExp(values.address, 'i')) !== -1
      )
    }
    setFilterData(objectData)
  }

  const [usergroupDeleteDisabled, setUsergroupDeleteDisabled] =
    useState<boolean>(true)

  useEffect(() => {
    if (selection.length === 0) {
      setUsergroupDeleteDisabled(true)
    } else {
      setUsergroupDeleteDisabled(false)
    }
  }, [selection])

  const handleUsergroupDeleteConfirm = () => {
    const s: number[] = selection.map(s => Number(s))
    s.forEach((v: number) => {
      userService
        .remove(v)
        .then(status => {
          if (status === 204) {
            setData(value => value.filter(d => d.id !== v))
          } else {
            message.error(`id:${v}删除失败`)
          }
        })
        .catch(() => message.error(`id:${v}删除失败`))
    })
    setSelection([])
  }

  const handleUsergroupDeleteCancel = () => {
    setSelection([])
  }

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editUser, setEditUser] = useState<UserType>()

  const handleEditButton = (record: UserType) => {
    setEditUser(record)
    setEditModalVisible(true)
  }

  const handleEditOk = async (values: UserType) => {
    try {
      const body = await userService.update(values.id, values)
      setData(data.map(d => (d.id === values.id ? body : d)))
      setEditModalVisible(false)
    } catch {
      message.error('编辑失败')
    }
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
  }

  const handleUserDelete = (index: number) => {
    setData(data.filter(d => d.id !== index))
  }

  const handleReset = () => {
    setFilterData(data)
  }

  const handleNewOk = async (values: UserTypeExcludeId) => {
    try {
      const body: UserType = await userService.createNew(values)
      setData(data.concat(body))
      message.success('新增成功')
      return true
    } catch {
      message.error('新增失败')
      return false
    }
  }

  return (
    <Layout>
      <PageHeader className='background' title='查询表格' subTitle='用户管理' />
      <Content>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div
            className='background'
            style={{ padding: '24px 24px 0px', margin: '24px 24px 0px' }}
          >
            <UserSearchGroup onFinish={handleSearch} onReset={handleReset} />
          </div>
          <div
            className='background'
            style={{ padding: 24, margin: '0px 24px 24px' }}
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              <ButtonGroup
                handleNewOk={handleNewOk}
                selection={selection}
                onCancel={handleUsergroupDeleteCancel}
                onConfirm={handleUsergroupDeleteConfirm}
                disabled={usergroupDeleteDisabled}
                reload={reload}
              />
              <UserTable
                selection={selection}
                handleSelection={handleSelection}
                data={filterData}
                onPage={clearSelection}
                handleEditButton={handleEditButton}
                handleUserDelete={handleUserDelete}
              />
              <EditForm
                visible={editModalVisible}
                onEdit={handleEditOk}
                onCancel={handleEditCancel}
                initialValues={editUser!}
              />
            </Space>
          </div>
        </Space>
      </Content>
    </Layout>
  )
}

export default User
