/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
      return [
         {
            source: '/',
            destination: '/contracts/2023/0',
            permanent: true,
         },
         {
            source: '/contracts',
            destination: '/contracts/2023/0',
            permanent: true,
         },
         {
            source: '/contracts/:slug',
            destination: '/contracts/:slug/0',
            permanent: true,
         }
      ];
   },
}

module.exports = nextConfig
// module.exports = {}
