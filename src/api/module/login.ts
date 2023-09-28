import request from '@/utils/request'

/**
 * 登录
 */

interface ApiResult<T> {
  code?: number
  status: number
  msg: string
  data: T
}

export const login = <T>(username: string, password: string): Promise<ApiResult<T>> => {
  return request<ApiResult<T>>({
    url: '/api/auth/login',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}

export async function get<T>(url: string, params?: unknown): Promise<ApiResult<T>> {
  const response = await request.get<ApiResult<T>>(url, { params })
  return response
}
