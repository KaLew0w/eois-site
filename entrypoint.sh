# Определяем окружение (по умолчанию localhost)
ENV_FILE_PATH="/app/.env.localhost"
if [ "$APP_ENV" = "dev" ]; then
  ENV_FILE_PATH="/app/.env.dev"
elif [ "$APP_ENV" = "test" ]; then
  ENV_FILE_PATH="/app/.env.test"
elif [ "$APP_ENV" = "prod" ]; then
  ENV_FILE_PATH="/app/.env.prod"
fi

# Загружаем переменные из выбранного файла
set -a
source $ENV_FILE_PATH
set +a

# Создаём env-config.js для React
CONFIG_FILE=/usr/share/nginx/html/env-config.js
echo "window._env_ = {" > $CONFIG_FILE
echo "  VITE_KEYCLOAK_URL: '${VITE_KEYCLOAK_URL}'," >> $CONFIG_FILE
echo "  VITE_KEYCLOAK_REALM: '${VITE_KEYCLOAK_REALM}'," >> $CONFIG_FILE
echo "  VITE_KEYCLOAK_CLIENT: '${VITE_KEYCLOAK_CLIENT}'" >> $CONFIG_FILE
echo "}" >> $CONFIG_FILE

# Запуск Nginx
exec nginx -g 'daemon off;'