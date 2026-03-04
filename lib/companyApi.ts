import { http } from './request'

export interface Company {
  id?: number
  address?: string
  phone?: string | string[]
  email?: string | string[]
  wechatQrCode?: string | string[]
  createdAt?: string
  updatedAt?: string
}

export async function getCompany(): Promise<Company> {
  try {
    const response = await http.get('/company');
    return response.data || {}
  } catch (error) {
    console.error('Failed to fetch company info:', error)
    return {}
  }
}