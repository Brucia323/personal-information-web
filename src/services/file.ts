import axios from 'axios'
import { FileType } from '../types'
const baseUrl: string = '/api/file'

let token: string = window.sessionStorage.getItem('currentUser')
  ? JSON.parse(window.sessionStorage.getItem('currentUser')!).token
  : null

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const update = async (id: number, newObject: FileType) => {
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

const getCount = async () => {
  const config = { headers: { Authorization: token } }

  const response = await axios.get(`${baseUrl}/count`, config)
  return response.data
}

const getType = async () => {
  const config = { headers: { Authorization: token } }

  const response = await axios.get(`${baseUrl}/type`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, update, remove, getCount, getType, getToken }
