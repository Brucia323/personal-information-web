import { InboxOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import React, { useState } from 'react'
import { UploadModalType } from '../../types'
import fileService from '../../services/file'

const UploadModal: React.FC<UploadModalType> = ({ onUpload }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>上传</Button>
      <Modal
        visible={visible}
        title='上传'
        footer={null}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Dragger
          name='file'
          action='http://localhost:8080/api/file'
          headers={{ Authorization: fileService.getToken() }}
          onChange={info => {
            const { status, response } = info.file
            if (status !== 'uploading') {
              console.log(info.file, info.fileList)
            }
            if (status === 'done') {
              message.success(`${info.file.name} 文件上传成功。`)
              setVisible(false)
              console.log({info})
              onUpload(response)
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
          <p className='ant-upload-hint'>仅支持单一文件上传。</p>
        </Dragger>
      </Modal>
    </>
  )
}

export default UploadModal
