import dns from "node:dns"
dns.setServers(['8.8.8.8', '8.8.4.4'])
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
