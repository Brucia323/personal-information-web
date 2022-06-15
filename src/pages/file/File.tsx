import { Layout, message, PageHeader, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'
import FileSearchGroup from './FileSearchGroup'
import fileService from '../../services/file'
import { FileSearchType, FileType } from '../../types'
import UploadModal from './UploadModal'
import FileTable from './FileTable'

const File = () => {
  const [data, setData] = useState<FileType[]>([])
  const [filterData, setFilterData] = useState<FileType[]>([])

  useEffect(() => {
    fileService
      .getAll()
      .then(value => setData(value))
      .catch(() => message.error('数据获取失败'))
  },[])

  useEffect(() => {
    setFilterData(data)
  }, [data])

  const handleSearch = (values: FileSearchType) => {
    let files = data
    if (values.filename) {
      files = files.filter(
        value => value.filename.search(new RegExp(values.filename, 'i')) !== -1
      )
    }
    if (values.filetype !== 'all') {
      files = files.filter(
        value => value.filetype.search(new RegExp(values.filetype, 'i')) !== -1
      )
    }
    setFilterData(files)
  }

  const handleReset = () => setFilterData(data)

  const handleUpload = (value: FileType) => {
    setData(data.concat(value))
  }

  const updateFile = async (file: FileType) => {
    try {
      const response: FileType = await fileService.update(file.id, file)
      setFilterData(
        filterData.map(value => (value.id === response.id ? response : value))
      )
    } catch {
      message.error('这似乎不是你的文件')
    }
  }

  return (
    <Layout>
      <PageHeader className='background' title='查询表格' subTitle='文件管理' />
      <Content>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div
            className='background'
            style={{ padding: '24px 24px 0px', margin: '24px 24px 0px' }}
          >
            <FileSearchGroup onFinish={handleSearch} onReset={handleReset} />
          </div>
          <div
            className='background'
            style={{ padding: 24, margin: '0px 24px 24px' }}
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              <UploadModal onUpload={handleUpload} />
              <FileTable data={filterData} updateFile={updateFile} />
            </Space>
          </div>
        </Space>
      </Content>
    </Layout>
  )
}

export default File
