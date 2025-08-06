# Gunakan image resmi node
FROM node:18-bullseye

# Buat direktori kerja
WORKDIR /app

# Salin file proyek
COPY . .

# Install dependencies
RUN npm install

# Build aplikasi Nuxt
RUN npm run build

# Jalankan aplikasi menggunakan Nuxt preview
CMD ["npm", "run", "preview"]
