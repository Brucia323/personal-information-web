import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import { Button, message, Modal, Popconfirm, Space } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import { FC, useState } from 'react'
import { UserButtonGroupType, UserTypeExcludeId } from '../../types'
import NewForm from './NewForm'

const ButtonGroup: FC<UserButtonGroupType> = ({
  handleNewOk,
  selection,
  onCancel,
  onConfirm,
  disabled,
  reload,
}) => {
  const [newModalVisible, setNewModalVisible] = useState(false)
  const [importVisible, setImportVisible] = useState(false)

  const onCreate =async (values: UserTypeExcludeId) => {
    const result = await handleNewOk(values)
    if (result) {
      setNewModalVisible(!newModalVisible)
    }
  }

  return (
    <Space>
      <Button onClick={() => setNewModalVisible(!newModalVisible)}>新增</Button>
      <NewForm
        visible={newModalVisible}
        onCreate={onCreate}
        onCancel={() => setNewModalVisible(!newModalVisible)}
      />
      <Popconfirm
        title={`你确定要删除${selection.length.toString()}位用户吗？`}
        onCancel={onCancel}
        onConfirm={onConfirm}
        okButtonProps={{ icon: <CheckCircleOutlined /> }}
        cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
        disabled={disabled}
      >
        <Button danger disabled={disabled}>
          批量删除
        </Button>
      </Popconfirm>
      <Button onClick={() => setImportVisible(!importVisible)}>导入</Button>
      <Modal
        visible={importVisible}
        title='导入'
        footer={null}
        onCancel={() => setImportVisible(!importVisible)}
        destroyOnClose
      >
        <Dragger
          name='file'
          accept='.xls,.xlsx,.csv'
          action='http://localhost:8080/api/user/import'
          onChange={info => {
            const { status } = info.file
            if (status !== 'uploading') {
              console.log(info.file, info.fileList)
            }
            if (status === 'done') {
              message.success(`${info.file.name} 文件上传成功。`)
              setImportVisible(!importVisible)
              reload()
            } else if (status === 'error') {
              message.error(`${info.file.name} 文件上传失败。`)
            }
          }}
          maxCount={1}
          showUploadList={false}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>点击或拖动文件到此区域进行上传</p>
          <p className='ant-upload-hint'>
            仅支持单一文件上传。支持 .xls、.xlsx、.csv
          </p>
        </Dragger>
      </Modal>
      <Button
        onClick={() => {
          window.open('http://localhost:8080/api/user/export')
        }}
      >
        导出
      </Button>
    </Space>
  )
}

export default ButtonGroup
