import { createLogger, format, transports, Logger } from 'winston'

// 日志级别
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// 根据环境选择日志级别
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// 日志颜色
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// 添加颜色支持
import { addColors } from 'winston'
addColors(colors)

// 日志格式
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

// 创建 logger 实例
const logger: Logger = createLogger({
  level: level(),
  levels,
  format: logFormat,
  transports: [
    // 控制台输出
    new transports.Console(),
    
    // 文件输出（生产环境）
    ...(process.env.NODE_ENV === 'production' ? [
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new transports.File({
        filename: 'logs/combined.log',
      }),
    ] : []),
  ],
})

// 开发环境下的简化 logger
const devLogger = {
  info: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, meta || '')
    }
  },
  error: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, meta || '')
    }
  },
  warn: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, meta || '')
    }
  },
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, meta || '')
    }
  },
}

// 导出 logger
export { logger, devLogger }
