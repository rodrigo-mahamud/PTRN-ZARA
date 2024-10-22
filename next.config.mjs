/** @type {import('next').NextConfig} */
const nextConfig = {
   staticPageGenerationTimeout: 180,
   reactStrictMode: true,
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
            port: "",
            pathname: "/images/**",
         },
      ],
   },
};

export default nextConfig;
