/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Aumenta o limite para 10MB para aceitar as fotos em Base64
    },
  },
};

export default nextConfig;
