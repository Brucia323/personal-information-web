import axios from 'axios'
import { UserTypeExcludeId, UserType } from '../types'
const baseUrl: string = '/api/user'

let token: string = window.sessionStorage.getItem('currentUser')
  ? JSON.parse(window.sessionStorage.getItem('currentUser')!).token
  : null

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createNew = async (newObject: UserTypeExcludeId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id: number, newObject: UserType) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

const exportDemo = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/export`, {
    responseType: 'blob',
    ...config,
  })

  let fileName =
    response.headers['content-disposition'].match(/filename=(.*)/)![1]
  fileName = fileName.replace(new RegExp('"', 'g'), '')
  const blob = new Blob([response.data], { type: 'application/octet-stream' })
  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', decodeURI(fileName))
  document.body.appendChild(tempLink)
  tempLink.click()
  console.log({ tempLink })
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

const getCount = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/count`, config)
  return response.data
}

const getOne = async () => {
  const config = { headers: { Authorization: token } }

  const response = await axios.get(`${baseUrl}/one`, config)
  return response.data
}

const updatePassword = async (password: string) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.put(
    `${baseUrl}/password`,
    { password: password },
    config
  )
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew,
  update,
  remove,
  exportDemo,
  setToken,
  getCount,
  getOne,
  updatePassword,
}
