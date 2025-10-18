'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createMessage, CreateMessageDto } from '../../lib/messageApi'
import { getCompany, Company } from '../../lib/companyApi'

export default function Contact() {
  const [formData, setFormData] = useState<CreateMessageDto>({
    name: '',
    email: '',
    phone: '',
    content: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [companyInfo, setCompanyInfo] = useState<Company>({})
  const [companyLoading, setCompanyLoading] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const loadCompanyInfo = async () => {
    try {
      const data = await getCompany()
      setCompanyInfo(data)
    } catch (error) {
      console.error('Failed to load company info:', error)
    } finally {
      setCompanyLoading(false)
    }
  }

  useEffect(() => {
    loadCompanyInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 表单验证
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.content.trim()) {
      setMessage('请填写完整信息')
      return
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage('请输入正确的邮箱格式')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await createMessage(formData)
      
      if (response.success) {
        setMessage('留言提交成功！我们会尽快与您联系。')
        // 清空表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          content: ''
        })
      } else {
        setMessage(response.message || '提交失败，请重试')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setMessage('提交失败，请检查网络连接后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold mb-8">联系我们</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 联系信息 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">联系方式</h2>
          {companyLoading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* {companyInfo.address && (
                <div>
                  <h3 className="font-semibold mb-2">公司地址</h3>
                  <p className="text-gray-600">{companyInfo.address}</p>
                </div>
              )} */}
              {companyInfo.phone && (
                <div>
                  <h3 className="font-semibold mb-2">联系电话</h3>
                  <p className="text-gray-600">{companyInfo.phone}</p>
                </div>
              )}
              {companyInfo.email && (
                <div>
                  <h3 className="font-semibold mb-2">电子邮箱</h3>
                  <p className="text-gray-600">{companyInfo.email}</p>
                </div>
              )}
              <div>
                <h3 className="font-semibold mb-2">工作时间</h3>
                <p className="text-gray-600">周一至周五: 9:00 - 18:00</p>
              </div>
              {companyInfo.wechatQrCode && (
                <div>
                  <h3 className="font-semibold mb-2">微信二维码</h3>
                  <Image 
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${companyInfo.wechatQrCode}`} 
                    alt="微信二维码" 
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </section>

        {/* 联系表单 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">在线留言</h2>

          {message && (
            <div className={`mb-4 p-3 rounded-md ${
              message.includes('成功') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                电话
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                留言内容
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 text-white rounded-md transition ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? '提交中...' : '提交留言'}
            </button>
          </form>
        </section>
      </div>

      {/* 地图区域 */}
      {/* <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">公司位置</h2>
        <div className="w-full h-96 bg-gray-200 rounded-lg">
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            地图区域
          </div>
        </div>
      </section> */}
    </main>
  );
}