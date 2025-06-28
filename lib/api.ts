import { serverHttp} from './serverRequest'

export interface GroupedInstrument {
  typeId: number
  typeName: string
  items: InstrumentItem[]
}

export interface ModelItem {
  id: number
  name: string
  params: {name: string, value: string, id: number}[]
}

export interface FeatureItem {
  id: number
  text: string
  images: string[]
}

export interface InstrumentItem {
  id: number
  name: string
  desc: string
  region: string
  createTime: string
  images?: {id: number, url: string}[]
  models?: ModelItem[]
  features?: FeatureItem[]
  type: {
    id: number
    name: string
  }
}

// 按类型分组的数据转换函数
export function groupInstrumentsByType(apiData: InstrumentItem[]): GroupedInstrument[] {
  // 使用 Map 进行分组
  const groupedMap = new Map<number, GroupedInstrument>()

  apiData.forEach((item: InstrumentItem) => {
    const typeId = item.type.id
    const typeName = item.type.name || '未知类型'
    
    if (!groupedMap.has(typeId)) {
      groupedMap.set(typeId, {
        typeId,
        typeName,
        items: []
      })
    }

    const group = groupedMap.get(typeId)!
    group.items.push(item);
  })

  return Array.from(groupedMap.values()).sort((a, b) => a.typeId - b.typeId)
}

// 获取设备数据的函数
export async function getEquipmentData(): Promise<GroupedInstrument[]> {
  try {
    const response = await serverHttp.get(`/instrument?typeType=1`);
    const data = response.data
    const groupedData = groupInstrumentsByType(data)
    console.log('getEquipmentData groupedData',groupedData)
    return groupedData

  } catch(e) {
    return []
  }

  // const transformedData = groupInstrumentsByType(response.data)
  
  // return transformedData

  // 目前使用模拟数据
  return [
    {
      title: '呼吸和肺功能设备',
      items: [
        {
          id: 'respiratory-machine',
          name: '呼吸机',
          description: '高精度呼吸功能检测设备',
          image: '/equipment/respiratory1.jpg',
          details: '我们的呼吸机采用先进的传感技术，提供精确的呼吸支持。适用于各种临床场景，包括重症监护和家庭护理。',
          specifications: [
            { '型号': 'RM-2000' },
            { '尺寸': '30cm x 25cm x 15cm' },
            { '重量': '3.5kg' },
            { '电源': 'AC 220V, 50Hz' },
            { '工作模式': '辅助通气、控制通气、同步间歇指令通气' }
          ]
        },
        {
          id: 'lung-function-tester',
          name: '肺功能测试仪',
          description: '专业肺功能检测分析设备',
          image: '/equipment/respiratory2.jpg',
          details: '肺功能测试仪可以全面评估肺部健康状况，测量肺容量、气流速率和气体交换效率。配备先进的分析软件，提供详细的测试报告。',
          specifications: [
            { '型号': 'LFT-500' },
            { '测量范围': '0-16L' },
            { '流量范围': '0-16L/s' },
            { '精度': '±3%' },
            { '接口': 'USB, Bluetooth' }
          ]
        }
      ]
    },
    {
      title: '流体泵',
      items: [
        {
          id: 'peristaltic-pump',
          name: '蠕动泵',
          description: '精密液体输送设备',
          image: '/equipment/pump1.jpg',
          details: '蠕动泵采用先进的蠕动技术，可以精确控制液体流量，适用于实验室和工业应用。具有防腐蚀、易清洁的特点。',
          specifications: [
            { '型号': 'PP-100' },
            { '流量范围': '0.1-600ml/min' },
            { '转速': '0.1-600rpm' },
            { '通道数': '1-4通道可选' },
            { '控制方式': '触摸屏+旋钮控制' }
          ]
        },
        {
          id: 'injection-pump',
          name: '注射泵',
          description: '高精度注射系统',
          image: '/equipment/pump2.jpg',
          details: '注射泵提供精确的液体输送，适用于药物研究、化学分析和医疗应用。具有高精度、稳定性好的特点。',
          specifications: [
            { '型号': 'IP-200' },
            { '注射速率': '0.1μl/h - 200ml/h' },
            { '注射器规格': '10μl - 60ml' },
            { '精度': '±0.5%' },
            { '显示': '4.3英寸彩色触摸屏' }
          ]
        }
      ]
    }
  ]
}

// 根据ID获取单个设备的详细信息
export async function getEquipmentById(id: string): Promise<InstrumentItem | null> {
  try {
    const response = await serverHttp.get(`/instrument/${id}`)
    return response.data
  } catch(e) {
    return null
  }
}

// 分页获取仪器设备
export async function getEquipmentByPage(page = 1, pageSize = 3): Promise<InstrumentItem[]> {
  try {
  const response = await serverHttp.post(`/instrument/list`, {
    page: {
      currentPage: page,
      pageSize,
    },
    typeType: 1
    })
    console.log('equipment response.data',response.data)
    return response.data.list
  } catch(e) {
    return []
  }
}

// 分页获取试剂耗材
export async function getReagentsByPage(page = 1, pageSize = 3): Promise<InstrumentItem[]> {
  try {
  const response = await serverHttp.post(`/instrument/list`, {
    page: {
      currentPage: page,
      pageSize,
    },
    typeType: 2
  })
    console.log('reagents response.data',response.data)
    return response.data.list
  } catch(e) {
    return []
  }
}