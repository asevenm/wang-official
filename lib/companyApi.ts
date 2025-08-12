import { request } from './request'

export interface Company {
  id?: number
  address?: string
  phone?: string
  email?: string
  wechatQrCode?: string
  createdAt?: string
  updatedAt?: string
}

export async function getCompany(): Promise<Company> {
  try {
    const response = await request('/company', {
      method: 'GET',
    })
    return response.data || {}
  } catch (error) {
    console.error('Failed to fetch company info:', error)
    return {}
  }
}