FROM node AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN yarn

FROM node AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build

FROM node AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# 创建日志目录
RUN mkdir -p /app/logs

# 设置日志权限
RUN chmod 755 /app/logs

EXPOSE 3000
CMD ["npm", "start"]
