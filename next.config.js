/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
      return [
         {
            source: '/contracts',
            destination: '/contracts/2023/0',
            permanent: false,
         },
         {
            source: '/contracts/:slug',
            destination: '/contracts/:slug/0',
            permanent: false,
         }
      ];
   },
}

module.exports = nextConfig
// module.exports = {}
