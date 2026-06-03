# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Install serve to serve build folder
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Run production build
CMD ["serve", "-s", "build", "-l", "3000"]

# Build docker ko có file docker compose
# docker build -t beauty-salon-fe .

# Chạy container ở foreground, tắt termianal thì container sẽ dừng luôn, Docker tự random tên container
# docker run -p 3000:3000 beauty-salon-fe

# -d = detached mode → chạy nền (background)
#  Terminal trả về ngay container ID, Container vẫn chạy sau khi đóng terminal
# --name beauty-salon-fe
# → đặt tên cố định cho container
# docker run -d -p 3000:3000 --name beauty-salon-fe beauty-salon-fe

# Stop container
# docker stop beauty-salon-fe

# Start container
# docker start beauty-salon-fe

# Xóa container
# docker rm -f beauty-salon-fe

# Check 100 log cuối của Container
# docker logs -t --tail 100 beauty-salon-fe

# Check log của container theo thời gian thực
# docker logs -f beauty-salon-fe

# Bash vào Container
# docker exec -it sim_crawler bash