/** @type {import('next').NextConfig} */
const nextConfig = {
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
