import { http } from './request'

export interface ServiceImage {
  id: number
  service_id: number
  url: string
  description: string
  sort_order: number
}

export interface ServiceItem {
  id: number
  category_id: number
  name: string
  description: string
  detailed_description: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  images: ServiceImage[]
}

export interface CategoryItem {
  id: number
  title: string
  name: string
  description: string
  services: ServiceItem[]
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export const servicesApi = {
  getServices: (): Promise<CategoryItem[]> => {
    return http.get('/service-categories').then(response => response.data)
  },

  getCategoryById: (id: number): Promise<CategoryItem> => {
    return http.get(`/service-categories/${id}`).then(response => response.data)
  },

  getServiceById: (id: number): Promise<ServiceItem> => {
    return http.get(`/services/${id}`).then(response => response.data)
  }
}

export default servicesApi