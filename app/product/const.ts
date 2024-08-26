const comsumables = [
  {
    id: 1,
      "purpose": "用于大小鼠标记",
      "name": "耳标钳",
      "model": "DI20-EQ01",
      "description": "304不锈钢，耐高温高 压消毒，双弹簧设计，操作更 省力"
  },
  {
    id: 2,
      "purpose": "用于大小鼠脑部器官微升级注射给药",
      "name": "微升注射针",
      "model": "7632-01",
      "description": "汉密尔顿(Hamilton) 系列注射针，多型号可选"
  },
  {
    id: 3,
      "purpose": "用于大小鼠等小动物皮肤打孔取样",
      "name": "快速活检取样器",
      "model": "1.0mm，1.5mm，2.0mm",
      "description": "原装进口KAI，多种型号可选，灭菌包装。"
  },
  {
    id: 4,
      "purpose": "用于制作大小鼠大脑中动脉阻塞模型。",
      "name": "MCAO线栓",
      "model": "1.0mm，1.5mm，2.0mm",
      "description": "美国DOCCOL,1管5根。 国产,1管20根，多种规格可选"
  },
  {
    id: 5,
      "purpose": "用于生理学检测的手动切片工具",
      "name": "脑模具",
      "model": "小鼠(15-35g)",
      "description": "经过精密的机械加工和高度抛光，可以确保切片过程 的可重复性，多型号可选"
  },
  {
    id: 6,
      "purpose": "用于大小鼠连续长时间以预期的速率靶向给药",
      "name": "缓释胶囊",
      "model": "1002，2001，2ML4等",
      "description": "ALZET缓释胶囊，1盒10个 灭菌包装，3种容量，多型号可选"
  },
  {
    id: 7,
      "purpose": "用于大小鼠脑部给药",
      "name": "动物微量给药导管",
      "model": "22G",
      "description": "可埋植于大小鼠颅脑，包 括基座、注射内管和导管帽，适 用于多种的药物在相同位置或者 不同深度位置的精确注射给药， 多型号可选"
  },
  {
    id: 8,
      "purpose": "用于大小鼠灌胃",
      "name": "灌胃针",
      "model": "8号，12号，16号",
      "description": "8号灌胃针 适合 20-25g小鼠;12号灌胃针 适合 25g以上的小鼠，多型号可选"
  },
  {
    id: 9,
      "purpose": "用于大小鼠手术实验操作快速固定牵拉伤口。如大小鼠开胸 腔、开腹腔、颈部插管开手术",
      "name": "多功能手术操作台",
      "model": "DSC1200",
      "description": "大小鼠专用，包含底板，磁 吸固定柱，牵拉勾等"
  },
  {
    id: 10,
      "purpose": "用于大小鼠手术实验操作快速缝合伤口",
      "name": "伤口缝合器",
      "model": "10757",
      "description": "大小鼠专用，cellpoint 原装进口，另有国产平替，多 型号可选"
  },
  {
    id: 11,
      "purpose": "用于手术实验操作缝合伤口",
      "name": "带针缝合线",
      "model": "3-0，4-0，5-0",
      "description": "每盒12包，每包1根，多 型号可选"
  },
  {
    id: 12,
      "purpose": "用于搭配气体麻醉机使用，大小鼠吸入式麻醉",
      "name": "异氟烷(Isoflurane)",
      "model": "3100M",
      "description": "每瓶100ML，异氟烷几乎完全由肺清除，对药代试和毒理试验干扰最小"
  },
  {
    id: 13,
      "purpose": "用于大小鼠解剖分离等手术实验",
      "name": "手术剪",
      "model": "多型号可选",
      "description": "大小鼠专用，包含手术剪， 眼科镊，显微剪，显微镊，咬骨钳 ，维纳斯剪，血管夹等"
  },
  {
    id: 14,
      "purpose": "用于大小鼠解剖分离等手术实验",
      "name": "手术器械套装",
      "model": "10725",
      "description": "大小鼠专用，多种套装型号对应实验场景可选"
  },
  {
    id: 15,
      "purpose": "专用于大小鼠注射麻醉",
      "name": "三溴乙醇",
      "model": "10ML",
      "description": "麻醉时间:5分钟内可 完全麻醉，维持麻醉约10-40分 钟，仅对大小鼠有效"
  },
  {
    id: 16,
      "purpose": "用于收集大小鼠尿液粪便",
      "name": "代谢笼",
      "model": "PCM1",
      "description": "分大鼠或小鼠型号， PSU聚砜材质，可耐高温160 °C，耐高压"
  },
];

const commonEquipments = [
  {
    id: 17,
    "purpose": "用于大小鼠尾部静脉注射实验",
    "name": "可视尾注固定器",
    "model": "YLS-Q9",
    "description": "22*14*12.5cm 0.5W LED 黄光灯，五倍放大镜 ，配带压块释放脚踏开关"
  },
  {
    id: 18,
    "purpose": "用小型手术器械快速消毒灭菌",
    "name": "玻璃珠灭菌器",
    "model": "Germinator 500",
    "description": "原装进口15秒内完成对器械尖端表面消毒灭菌，不伤器械"
  },
  {
    id: 19,
    "purpose": "用于测量大小鼠核心体温",
    "name": "大小鼠体温计",
    "model": "ET03",
    "description": "测量精确稳定，反应迅速，测量范围20-50度，精度0.1度"
  },
  {
    id: 20,
    "purpose": "用于大小鼠气管插管",
    "name": "小鼠气管插管套装",
    "model": "000A3747",
    "description": "原装进口，另有大鼠包可选，可容纳直接可视化和快速插管所需的一切，且创伤最小"
  },
  {
    id: 21,
    "purpose": "用于大小鼠浅表小手术止血、组织凝结、赘生物烧灼、软组织切割等",
    "name": "止血笔",
    "model": "Gemini",
    "description": "原装进口，含两个5毫米和两个10毫米烧灼头，另有国产可选"
  },
  {
    id: 22,
    "purpose": "用于大小鼠脑神经实验颅骨开孔",
    "name": "台式高速颅钻",
    "model": "NF4500",
    "description": "适用于大小鼠脑神经实验，最高转速45000RPM，噪音低微，标配含6个钻头(耗材可单独配)"
  },
  {
    id: 23,
    "purpose": "用于大小灌流实验",
    "name": "蠕动泵",
    "model": "BT100L",
    "description": "流速范围0.005~641mL/min ，搭配YZ15泵头，用于大小鼠心脏，肾脏灌流离体实验"
  },
  {
    id: 24,
    "purpose": "用于观察组织细胞等",
    "name": "生物显微镜",
    "model": "Olympus CX23",
    "description": "性能稳定，效率更高。UIS2光学系统，内置0.5W LED透明照射系统。多型号可选"
  },
  {
    id: 25,
    "purpose": "用于大小鼠手术实验操作，可搭配脑立体定位仪，气体麻醉机等使用",
    "name": "大小鼠手术显微镜",
    "model": "SCL375",
    "description": "总放大倍数8-45倍，工作距离120mm，方便手术操作"
  },
  {
    id: 26,
    "purpose": "用于大小鼠手术实验操作照明",
    "name": "冷光源",
    "model": "301",
    "description": "20w，温和LED白光，色温6000K，照度16000000LX，搭配脑立体定位仪，显微镜等使用"
  },
  {
    id: 27,
    "purpose": "用于小鼠气管插管照明压舌，辅助找到气管口",
    "name": "可视喉镜",
    "model": "MS450",
    "description": "防水镜头，可搭配大小鼠雾化针使用，100万像素，充电1次可使用3-4小时"
  },
  {
    id: 28,
    "purpose": "用于大小鼠术中保温",
    "name": "术中保温仪",
    "model": "TCAT-2DF",
    "description": "原装进口，主机可控制加热等或加热垫，精度0.1°C ，有国产平替可选"
  },
  {
    id: 28,
    "purpose": "用于监测小鼠抓挠行为",
    "name": "自动抓挠计数仪",
    "model": "55600",
    "description": "原装进口，通过特殊高速相机和软件分析图像，能够实时、长期、快速、准确地量化小鼠的抓挠行为"
  },
  {
    id: 29,
    "purpose": "用于大小鼠肺部雾化定量给药",
    "name": "大小鼠雾化针",
    "model": "SC200",
    "description": "大小鼠专用，单次最小雾化量50ul，可快速精确对气管和肺部定量给药"
  },
  {
    id: 30,
    "purpose": "用于大小鼠运动，节律等实验控制温度、湿度、光照度，模拟白天及黑夜的温度、湿度变化等",
    "name": "大小鼠恒温恒湿饲养箱",
    "model": "SC250L",
    "description": "大小鼠专用，具有换气功能，避免饲养箱内二氧化碳储留 具有不同的规格尺寸供选择"
  },
  {
    id: 31,
    "purpose": "用于大小鼠灌流实验，微流控实验、匀胶机进液、质谱仪配套等",
    "name": "高精度注射泵",
    "model": "TSC02-02",
    "description": "2通道，另有最多10通道可选"
  }
];


const anestheticEquipments = [
  {
    id: 32,
    "purpose": "用于大小鼠手术操作等实验过程中维持麻醉",
    "name": "大小鼠气体麻醉机",
    "model": "DMT",
    "description": "原装进口麻醉挥发罐，一整套设备，拿到就能用，另有多种型号可选"
  },
  {
    id: 33,
    "purpose": "用于术中的呼吸管理、动物的急救、呼吸治疗等",
    "name": "小动物呼吸机",
    "model": "VentElite",
    "description": "原装进口，适用10 g ~1 kg，小鼠到豚鼠，潮气量50 ul ~5 ml 带容量/压力模式，另有国产多种型号可选"
  },
  {
    id: 34,
    "purpose": "安死术对实验动物安乐处死",
    "name": "小动物安乐死箱",
    "model": "GTSVF-4H",
    "description": "原装进口，四个独立的气体独立控制，可任意组合。另有国产多型号可选"
  },
  {
    id: 35,
    "purpose": "用于测量大小鼠的O2消耗量和CO2的产生量",
    "name": "小动物代谢监测仪",
    "model": "MM-100",
    "description": "原装进口，可测量O2消耗量及CO2产生量及气体流量，测量结果直接通过LCD显示，采用固态热能流量计测量空气流量"
  }
];

const sportsEquipments = [
  {
    id: 36,
    "purpose": "用于大小鼠的学习记忆的能力检测",
    "name": "Morris水迷宫",
    "model": "Morris",
    "description": "具有恒温加热功能，ABS塑料制作，更轻，无毒无害，带分析软件，另有其他行为学(研究学习记忆)产品可选"
  },
  {
    id: 37,
    "purpose": "用于检测大小鼠大脑受损状态下学习和记忆方面的表现等",
    "name": "八臂迷宫",
    "model": "多型号可选",
    "description": "专为大小鼠设计，含软件，另有其他行为学(研究焦虑，抑郁)产品可选"
  },
  {
    id: 38,
    "purpose": "用于大小鼠观测动物进入敞箱后的各种行为",
    "name": "自发活动(旷场)",
    "model": "多型号可选",
    "description": "流速评估实验动物的活动性和探索性行为。可选配隔音箱。另有其他行为学(可根据用户需求定制)产品可选"
  },
  {
    id: 39,
    "purpose": "用于搭配国产行为学硬件进行几乎所有行为学实验",
    "name": "动物行为分析系统",
    "model": "Any-maze",
    "description": "累计SCI文献数千篇，性价比最高的进口行为学软件"
  },
  {
    id: 40,
    "purpose": "用于大小鼠脊椎损伤，关节炎，脑损伤等评价",
    "name": "全自动步态分析系统",
    "model": "CatWalk XT",
    "description": "原装进口，光照摄取足印原理，可检测足迹分布，踏步节奏，速度等参数，另有国产可选"
  },
  {
    id: 41,
    "purpose": "用于大小鼠运动，营养肥胖，心血管疾病，药品等研究",
    "name": "动物跑轮",
    "model": "多型号可选",
    "description": "专用于大小鼠，一台主机最多可监测8个笼盒，可记录最大速度，平均速度，总路程，圈数等"
  },
  {
    id: 42,
    "purpose": "用于大小鼠手术实验操作，可搭配脑立体定位仪，气体麻醉机等使用",
    "name": "大小鼠跑步机",
    "model": "多型号可选",
    "description": "原装进口，带电网，正负25度倾斜，小鼠6通道，大鼠3通道。另有国产可选"
  },
  {
    "purpose": "用于研究药物对大小鼠动作协调性和抗疲劳特性的影响",
    "name": "大小鼠滚轮测试仪",
    "model": "多型号可选",
    "description": "Rota-Rod，原装进口，带软件。小鼠6跑道，大鼠3跑道，另有国产可选"
  }
];

const lungTestEquipments = [
  {
    "purpose": "侵入式进行气道阻力与动态肺顺应性的动物肺功能检测，能够用于包括大小鼠在内的动物肺功能研究",
    "name": "动物气道阻力与动态肺顺应性检测系统",
    "model": "RC",
    "description": "原装进口，检测Rl气道阻力及Cdyn动态肺顺应性、潮气量等直接生理指标"
  },
  {
    "purpose": "用于无创清醒检测动物气道高反应以及药物毒理学研究、药效评价中的快速筛选等",
    "name": "无创呼吸功能检测系统",
    "model": "WBP",
    "description": "原装进口，可做小鼠、大鼠，系统主机等可与RC、FM、HOP、PNM等系统共享"
  },
  {
    "purpose": "用于动物非临床安全性评价，呼吸系统疾病，环境污染物吸入毒性研究等",
    "name": "口鼻吸入暴露染毒系统",
    "model": "多规格可选",
    "description": "原装进口，适用于液体，粉尘等实验样品，兼容多种气溶胶发生器"
  },
  {
    "purpose": "动物呼吸系统疾病，药物安全性评价等",
    "name": "口鼻吸入暴露染毒系统",
    "model": "NIES-12(国产)",
    "description": "原装进口发生器及核心部件，自动化控制系统和软件，集中控制，进行大规模实验，可根据客户实验需求定制"
  }
];

const physiologicalMonitoringEquipments = [
  {
    "purpose": "专用于测量大小鼠的脉搏血氧仪，可用于动物清醒状态和麻醉状态",
    "name": "大小鼠脉搏血氧监测仪",
    "model": "015001",
    "description": "原装进口，可监测血氧饱和度，脉搏频率，脉搏波幅，呼吸频率，呼吸波幅等"
  },
  {
    "purpose": "用于采集大小鼠脑电，肌电信号，对睡眠，癫痫等相关药物疾病进行研究",
    "name": "大小鼠生物电测量系统",
    "model": "多型号可选",
    "description": "专为大小鼠设计，含专业的睡眠/癫痫分析软件，手术操作简单，可扩展"
  },
  {
    "purpose": "对大小鼠进行各种生理参数测量和分析",
    "name": "多道生理信号采集分析仪",
    "model": "多型号可选",
    "description": "原装进口，带软件，可测新生小鼠ECG，大小鼠EMG、ECG、EOG，体温，肌张力，呼吸，血压等参数，高灵活性，通用型数据采集器"
  },
  {
    "purpose": "用于在手术过程中监测ECG，体温等",
    "name": "大小鼠平板监护仪",
    "model": "RSM",
    "description": "触摸屏，集成化，标配心率，体温，ECG，呼吸；可选配有创血压，血氧等"
  },
  {
    "purpose": "用于大小鼠无创血压检测",
    "name": "大小鼠无创血压仪",
    "model": "MRBP",
    "description": "原装进口，文献众多，专用于大小鼠，专利恒温仓设计，同时测1-200只。可另有国产平替可选"
  },
  {
    "purpose": "用于动物网织血红蛋白，WBC, RET, PLT等血液，体液细胞检测",
    "name": "动物五分类血液分析仪",
    "model": "XN-1000V",
    "description": "五分类检测，用血量少，自动复检。可测27种动物，34项参数，另有三分类可选"
  },
  {
    "purpose": "用于检测生物血小板聚集",
    "name": "全血血小板聚集仪",
    "model": "700N",
    "description": "多型号可选，采用光学法，电阻法等远离检测，适用于大小鼠等样本量少的动物进行全血检测，有两通道或四通道配置可选，5分钟/Test"
  },
  {
    "purpose": "用于大小鼠精细地模拟临床放疗过程，探究不同放疗参数对癌症细胞的影响，优化放疗方案，开发新的放疗技术和药物",
    "name": "小动物精准放疗研究系统",
    "model": "Xstrahl",
    "description": "原装进口，专用于大小鼠，应用范围广泛，扩展工具全，自动控制，保证精确的放射剂量"
  }
]

const inflammationDetectionEquipments = [
  {
    "purpose": "用于检测动物的机械疼痛阈值",
    "name": "Von Frey电子测痛仪",
    "model": "38450",
    "description": "原装进口，自动记录动物反应，最大适用力1000g，分辨率0.1g。可通过菱镜定位，另有国产可选"
  },
  {
    "purpose": "用于检测药物的镇痛效果、评估动物的热痛敏感性或研究动物的遗传差异",
    "name": "足底热痛觉测试仪",
    "model": "390",
    "description": "原装进口，可做小鼠、大鼠，采用可见光法测试，精确数字程控，计时器精度:0.01秒，另有国产可选"
  },
  {
    "purpose": "用于小鼠热偏好表型分析",
    "name": "热梯度环测试仪",
    "model": "65400",
    "description": "原装进口，分别加热和冷却环形轨道的对侧两端，产生对称的热梯度，每侧创建12个区域(每个区域之间的Δ≈2.3°C)"
  },
  {
    "purpose": "测量大小鼠测量三叉神经区域对热刺激或机械刺激的敏感性",
    "name": "面部疼痛测试仪",
    "model": "31320",
    "description": "原装进口，提供机械刺激器和热刺激器，最多可同时测试16只动物，完整的振动垫，测试也不需要任何剃毛"
  }
];

const neuralTestingEquipments = [
  {
    "purpose": "用于大小鼠脑部固定，定位等",
    "name": "数显大小鼠脑立体定位仪",
    "model": "多型号可选",
    "description": "原装进口，专用于大小鼠，带数字显示器，读数方便，精确度为10μm，另有国产可选"
  },
  {
    "purpose": "可做细胞系，原代细胞，干细胞，脂双层等",
    "name": "单通道全自动膜片钳系统",
    "model": "Port-aPatch",
    "description": "原装进口，全细胞和单通道记录，最小的全自动膜片钳系统，适用于多种原代细胞等"
  },
  {
    "purpose": "用于降低总体记录噪音，消除兼容性问题",
    "name": "膜片钳放大器",
    "model": "EPC 10 USB",
    "description": "单通道记录，全细胞膜片钳记录：电压钳和电流钳/低频电压钳(LFVC)，AP测量"
  },
  {
    "purpose": "用于头部固定或清醒自由活动动物进行高通量、低噪声的高质量数据记录",
    "name": "动物在体神经电生理系统",
    "model": "Cereplex Direct",
    "description": "更高通道数、高性价比、适用范围更广、更低噪声，体积小巧"
  }
]

const organImagingEquipments = [
  {
    "purpose": "用于大小鼠心脏、腹部及浅表器官临床检查、诊断和教学",
    "name": "大小鼠便携超声成像仪",
    "model": "Sigma",
    "description": "拥有完整的心脏功能检测方案。可建立动物心脏检测模型，多探头可选"
  },
  {
    "purpose": "用于大小鼠神经障碍、肿瘤、炎症、代谢紊乱、器官功能、缺血再灌注等",
    "name": "大小鼠光声断层扫描系统",
    "model": "inVision",
    "description": "可断层扫描图像重建，自动化图像采集，三种成像模式"
  },
  {
    "purpose": "用于大小鼠生物组织进行全场、实时的二维血流成像，监测并分析血流的二维分布状态、血流值的定量变化程度，血管管径等参数技术参数",
    "name": "动物激光散斑血流成像仪",
    "model": "ZOOM",
    "description": "用于大小鼠脑缺血模型，烧实验，下肢与皮肤血流量，流速监测等实验"
  },
  {
    "purpose": "用于大小鼠视网膜显微成像，可观察明视野，血管造影，荧光成像",
    "name": "大小鼠视网膜成像系统",
    "model": "Micron V",
    "description": "原装进口，可扩展激光注射引导及激光器，高分辨率OCT，裂隙灯成像，ERG电生理等"
  }
];

const catgories = [
  {
    name: '大小鼠实验常用耗材',
    key: 'comsumables',
    equipments: comsumables,
  },
  {
    name: "大小鼠常用设备",
    key: 'commonEquipments',
    equipments: commonEquipments,
  },
  {
    name: "大小鼠实验专业设备",
    key: 'anestheticEquipments',
    children: [
      {
        name: '麻醉呼吸设备',
        key: 'anestheticEquipments',
        equipments: anestheticEquipments,
      },
      {
        name: '运动行为设备',
        key:'sportsEquipments',
        equipments: sportsEquipments,
      },
      {
        name: '肺功能检测设备',
        key:'lungTestEquipments',
        equipments: lungTestEquipments,
      },
      {
        name: '生理监测设备',
        key:'physiologicalMonitoringEquipments',
        equipments: physiologicalMonitoringEquipments,
      },
      {
        name: '炎症检测设备',
        key:'inflammationDetectionEquipments',
        equipments: inflammationDetectionEquipments,
      },
      {
        name: '神经电生理检测设备',
        key:'neuralTestingEquipments',
        equipments: neuralTestingEquipments,
      },
      {
        name: '器官功能成像设备',
        key:'organImagingEquipments',
        equipments: organImagingEquipments,
      },
    ],
  },
];

export { catgories };

