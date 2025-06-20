import { Input, Link, Button, Textarea } from "@nextui-org/react";
import Swiper from "../components/Swiper"
import MessageBoard from "../components/MessageBoard";

export default function Contact() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">联系我们</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 联系信息 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">联系方式</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">公司地址</h3>
              <p className="text-gray-600">上海市浦东新区某某路123号</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">联系电话</h3>
              <p className="text-gray-600">021-12345678</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">电子邮箱</h3>
              <p className="text-gray-600">contact@example.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">工作时间</h3>
              <p className="text-gray-600">周一至周五: 9:00 - 18:00</p>
              <p className="text-gray-600">周六至周日: 休息</p>
            </div>
          </div>
        </section>

        {/* 联系表单 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">在线留言</h2>
          <form className="space-y-4">
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
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                留言内容
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              提交留言
            </button>
          </form>
        </section>
      </div>

      {/* 地图区域 */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">公司位置</h2>
        <div className="w-full h-96 bg-gray-200 rounded-lg">
          {/* 这里可以嵌入地图组件 */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            地图区域
          </div>
        </div>
      </section>
    </main>
  );
}