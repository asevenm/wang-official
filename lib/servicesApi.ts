import { http } from './request'

export interface ServiceItem {
  id: number
  title: string
  description: string
  features: string[]
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export const servicesApi = {
  getServices: (): Promise<ServiceItem[]> => {
    return http.get('/services')
  }
}