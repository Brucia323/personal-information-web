import { MenuProps } from 'antd'
import { Key } from 'react'

export type MenuItem = Required<MenuProps>['items'][number]

export interface UserType {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  address: string
}

export type UserTypeExcludeId = Omit<UserType, 'id'>

export interface NewModalType {
  visible: boolean
  onCreate: (values: UserTypeExcludeId) => void
  onCancel: () => void
}

export interface EditModalType {
  visible: boolean
  onEdit: (values: UserType) => void
  onCancel: () => void
  initialValues: UserType
}

export interface UserTableType {
  selection: Key[]
  handleSelection: (key: Key[]) => void
  data: UserType[]
  onPage: () => void
  handleEditButton: (record: UserType) => void
  handleUserDelete: (index: number) => void
}

export interface LoginType {
  login: (values: LoginFormType) => Promise<boolean>
}

export interface LoginFormType {
  username: string
  password: string
  rememberPassword: boolean
}

export type CredentialsType = Omit<LoginFormType, 'rememberPassword'>

export interface CurrentUserType {
  token: string
  username: string
  nickname: string
}

export interface FileType {
  id: number
  filename: string
  filetype: string
  filesize: number
  openDownload: boolean
}

export interface UserButtonGroupType {
  handleNewOk: (values: UserTypeExcludeId) => Promise<boolean>
  selection: Key[]
  onCancel: () => void
  onConfirm: () => void
  disabled: boolean
  reload: () => void
}

export interface UserSearchGroupType {
  onFinish: (values: UserTypeExcludeId) => void
  onReset: () => void
}

export type FileSearchType = Omit<FileType, 'id' | 'filesize' | 'openDownload'>

export interface FileSearchGroupType {
  onFinish: (values: FileSearchType) => void
  onReset: () => void
}

export interface UploadModalType {
  onUpload: (value: FileType) => void
}

export interface FileTableType {
  data: FileType[]
  updateFile: (file: FileType) => void
}
