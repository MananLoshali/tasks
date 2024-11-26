# Step 1: Build the React app
FROM node:16 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

# # Step 2: Serve with Nginx
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
