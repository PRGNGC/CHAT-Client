FROM node:20-alpine
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
# COPY package.json ./
# USER root
# RUN chown -R app:app .
# USER app
COPY . .
RUN yarn install
EXPOSE 5173
CMD ["yarn", "dev"]
