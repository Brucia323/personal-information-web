import { Button, message, Popconfirm, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import UserService from '../../services/user'
import { UserTableType, UserType } from '../../types'

const UserTable: React.FC<UserTableType> = ({
  selection,
  handleSelection,
  data,
  onPage,
  handleEditButton,
  handleUserDelete,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1)

  const handlePage = (page: number) => setPageNumber(page)

  useEffect(() => onPage(), [onPage, pageNumber])

  const handleUserDeleteConfirm = async (index: number) => {
    const status = await UserService.remove(index)

    if (status === 204) {
      handleUserDelete(index)
      message.success('删除成功')
    } else {
      message.error('删除失败')
    }
  }

  return (
    <Table
      rowSelection={{
        selectedRowKeys: selection,
        onChange: handleSelection,
      }}
      dataSource={data}
      rowKey='id'
      pagination={{ onChange: handlePage, current: pageNumber }}
    >
      <Table.Column title='ID' dataIndex='id' />
      <Table.Column title='用户名' dataIndex='username' />
      <Table.Column title='昵称' dataIndex='nickname' />
      <Table.Column title='邮箱' dataIndex='email' />
      <Table.Column title='电话' dataIndex='phone' />
      <Table.Column title='地址' dataIndex='address' />
      <Table.Column
        title='操作'
        render={(value, record: UserType, index) => (
          <Space>
            <Button onClick={() => handleEditButton(record)} type='text'>
              编辑
            </Button>
            <Popconfirm
              title={`你确定要删除${record.username}吗？`}
              onConfirm={() => handleUserDeleteConfirm(record.id)}
            >
              <Button danger type='text'>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  )
}

export default UserTable
