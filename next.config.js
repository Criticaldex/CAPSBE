/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
      return [
         {
            source: '/contracts',
            destination: `/contracts/${process.env.CONTRACTS_DEFAULT_YEAR}/${process.env.CONTRACTS_DEFAULT_CENTER}`,
            permanent: false,
         },
         {
            source: '/contracts/:slug',
            destination: `/contracts/:slug/${process.env.CONTRACTS_DEFAULT_CENTER}`,
            permanent: false,
         },
         {
            source: '/profesionals',
            destination: `/profesionals/${process.env.PROFESIONALS_DEFAULT_VIEW}/${process.env.PROFESIONALS_DEFAULT_CENTER}/${process.env.PROFESIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/profesionals/:slug',
            destination: `/profesionals/:slug/${process.env.PROFESIONALS_DEFAULT_CENTER}/${process.env.PROFESIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/profesionals/:slug/:slug',
            destination: `/profesionals/:slug/:slug/${process.env.PROFESIONALS_DEFAULT_SECTION}`,
            permanent: false,
         }
      ];
   },
}

module.exports = nextConfig
// module.exports = {}
