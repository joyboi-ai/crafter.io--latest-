/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['gravatar.com'], //used to fetch  Add other domains if needed
    },
    eslint:{
      ignoreDuringBuilds:true,
    },
  };
  
  export default nextConfig;
  