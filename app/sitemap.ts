import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://thundermousebio.com' // 请替换为您的实际域名

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/agent`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/comsumables`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/equipment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // {
    //   url: `${baseUrl}/news`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/product`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
    {
      url: `${baseUrl}/reagents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // {
    //   url: `${baseUrl}/tech`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
  ]

  // 这里可以添加动态路由，比如从API获取设备、试剂、博客文章的ID
  // const equipmentRoutes = await fetch(`${baseUrl}/api/equipment`)
  //   .then(res => res.json())
  //   .then(data => data.map((item: any) => ({
  //     url: `${baseUrl}/equipment/${item.id}`,
  //     lastModified: new Date(item.updatedAt),
  //     changeFrequency: 'monthly',
  //     priority: 0.6,
  //   })))

  return [
    ...staticRoutes,
    // ...equipmentRoutes,
    // ...reagentRoutes,
    // ...blogRoutes,
  ]
}