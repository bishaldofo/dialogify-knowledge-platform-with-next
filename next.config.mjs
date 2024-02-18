/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["i.ibb.co", "https://i.ibb.co", "res.cloudinary.com"], // Add the hostname "i.ibb.co" to the list of allowed domains
   },
};

export default nextConfig;
