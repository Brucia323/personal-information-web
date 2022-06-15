import axios from 'axios'
import { CredentialsType } from '../types'
const baseUrl = '/api/login'

const login = async (credentials: CredentialsType) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
