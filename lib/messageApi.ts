import { http, ApiResponse } from './request'

export interface CreateMessageDto {
  name: string
  email: string
  phone: string
  content: string
}

export async function createMessage(data: CreateMessageDto): Promise<ApiResponse<any>> {
  try {
    return await http.post<ApiResponse<any>>('/messages', data)
  } catch (error) {
    console.error('Error creating message:', error)
    throw error
  }
}
