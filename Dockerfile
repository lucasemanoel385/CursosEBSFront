FROM node:20 as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Variável passada via ARG no docker-compose
ARG API_URL
ENV API_URL=${API_URL}

# Substitui a string no environment
RUN sed -i "s|API_URL_REPLACE|${API_URL}|g" src/environments/environment.prod.ts

RUN npx ng build --configuration=production --project=platform

FROM nginx:alpine

# Copia o build do Angular para o diretório padrão do NGINX
COPY --from=build /app/dist/platform/browser /usr/share/nginx/html

# Copia o nginx.conf customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80