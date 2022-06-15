import { Button, Switch, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import React, { useEffect, useState } from 'react'
import { FileTableType, FileType } from '../../types'

const FileTable: React.FC<FileTableType> = ({ data, updateFile }) => {
  const [page, setPage] = useState<number>(1)

  useEffect(() => setPage(1), [data])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleSwitchChange = (checked: boolean, record: FileType) => {
    const file: FileType = {
      ...record,
      openDownload: checked,
    }
    updateFile(file)
  }

  return (
    <Table
      dataSource={data}
      rowKey='id'
      pagination={{ onChange: handlePageChange, current: page }}
    >
      <Column title='ID' dataIndex='id' />
      <Column title='文件名' dataIndex='filename' />
      <Column title='文件类型' dataIndex='filetype' />
      <Column title='文件大小' dataIndex='filesize' />
      <Column
        title='权限'
        dataIndex='openDownload'
        render={(value: boolean, record: FileType, index) => (
          <Switch
            checkedChildren='公开'
            unCheckedChildren='私密'
            defaultChecked={value}
            onChange={(checked: boolean) => handleSwitchChange(checked, record)}
          />
        )}
      />
      <Column
        title='操作'
        render={(value, record: FileType, index) => (
          <Button
            type='link'
            onClick={() =>
              window.open(`http://localhost:8080/api/file/${record.id}`)
            }
          >
            下载
          </Button>
        )}
      />
    </Table>
  )
}

export default FileTable
