FROM node:24-alpine

WORKDIR /opt/app
COPY package.json ./
COPY node_modules ./node_modules
COPY dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
