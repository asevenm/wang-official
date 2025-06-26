import { serverHttp } from './serverRequest'
import { InstrumentItem, groupInstrumentsByType, GroupedInstrument } from './api'

// 获取所有试剂耗材数据
export async function getReagentsData(): Promise<GroupedInstrument[]> {
  const response = await serverHttp.get(`/instrument?typeType=2`)
  const data = response.data
  const groupedData = groupInstrumentsByType(data)
  return groupedData
  
  // 目前使用模拟数据
  return [
    {
      title: '试剂',
      subcategories: [
        {
          id: 'animal-reagents',
          name: '动物实验相关试剂',
          description: '专为动物实验设计的高质量试剂，确保实验结果的准确性和可重复性。',
          items: [
            {
              id: 'animal-reagent-a',
              name: '实验试剂A',
              description: '用于动物组织样本处理的专业试剂，提高样本纯度。',
              specifications: ['规格: 100ml/瓶', '纯度: >99%', '保存条件: 2-8°C'],
              price: '¥580/瓶',
              stock: '现货'
            },
            {
              id: 'animal-reagent-b',
              name: '实验试剂B',
              description: '专用于动物细胞培养的高效试剂，促进细胞生长。',
              specifications: ['规格: 50ml/瓶', '纯度: >98%', '保存条件: -20°C'],
              price: '¥680/瓶',
              stock: '现货'
            },
            {
              id: 'animal-reagent-c',
              name: '实验试剂C',
              description: '动物实验染色试剂，提供清晰的细胞结构观察。',
              specifications: ['规格: 20ml/瓶', '纯度: >99.5%', '保存条件: 室温避光'],
              price: '¥420/瓶',
              stock: '7天发货'
            }
          ]
        },
        {
          id: 'immunology',
          name: '免疫学',
          description: '高质量免疫学试剂，适用于各类免疫学研究和临床诊断。',
          items: [
            {
              id: 'immuno-reagent-a',
              name: '免疫试剂A',
              description: '用于抗体检测的高灵敏度试剂，适用于ELISA实验。',
              specifications: ['规格: 96T/盒', '灵敏度: 1pg/ml', '保存条件: 2-8°C'],
              price: '¥1280/盒',
              stock: '现货'
            },
            {
              id: 'immuno-reagent-b',
              name: '免疫试剂B',
              description: '免疫荧光染色试剂，提供高信噪比的荧光信号。',
              specifications: ['规格: 1ml/支', '激发波长: 488nm', '保存条件: -20°C避光'],
              price: '¥980/支',
              stock: '现货'
            },
            {
              id: 'immuno-reagent-c',
              name: '免疫试剂C',
              description: '免疫细胞分离试剂，高效分离特定免疫细胞群。',
              specifications: ['规格: 10ml/瓶', '纯度: >95%', '保存条件: 2-8°C'],
              price: '¥1580/瓶',
              stock: '预订'
            }
          ]
        },
        // 其他子类别数据...
        {
          id: 'proteomics',
          name: '蛋白组学',
          description: '蛋白组学研究专用试剂，满足蛋白质提取、纯化和分析需求。',
          items: [
            {
              id: 'protein-reagent-a',
              name: '蛋白试剂A',
              description: '蛋白质提取试剂，高效提取各类组织和细胞中的蛋白质。',
              specifications: ['规格: 100ml/瓶', '适用范围: 动植物组织', '保存条件: 4°C'],
              price: '¥780/瓶',
              stock: '现货'
            },
            // 其他项目...
          ]
        }
      ]
    },
    {
      title: '耗材',
      subcategories: [
        {
          id: 'metal-consumables',
          name: '金属',
          description: '高质量金属实验耗材，耐用且精确。',
          items: [
            {
              id: 'metal-consumable-a',
              name: '金属耗材A',
              description: '不锈钢实验工具，耐腐蚀，使用寿命长。',
              specifications: ['材质: 316L不锈钢', '规格: 标准型', '包装: 10件/盒'],
              price: '¥380/盒',
              stock: '现货'
            },
            // 其他项目...
          ]
        },
        // 其他子类别...
      ]
    }
  ]
}

export async function getReagentItemById(itemId: string): Promise<InstrumentItem | null> {
  const response = await serverHttp.get(`/instrument/${itemId}`)
  const data = response.data
  return data
}