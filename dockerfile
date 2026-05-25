# Шаг 1: Сборка приложения
FROM node:18-alpine AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
RUN npm install

# Копируем все файлы
COPY . .

# Сборка для production
RUN npm run build:docker

# Шаг 2: Запуск через Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .

# Конфиг Nginx (чтобы работал React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Конфиг Nginx (чтобы работал React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]