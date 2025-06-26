// wang-official/lib/partnersApi.ts
import { serverHttp } from './serverRequest'

export interface Partner {
  id: number
  name: string
  icon?: string
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await serverHttp.get('/agent-brand')
    return response.data || []
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}