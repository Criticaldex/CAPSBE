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
            source: '/profesionals/global',
            destination: `/profesionals/global/${process.env.PROFESIONALS_DEFAULT_CENTER}/${process.env.PROFESIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/profesionals/global/:centre',
            destination: `/profesionals/global/:centre/${process.env.PROFESIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/profesionals/individual',
            destination: `/profesionals/individual/${process.env.PROFESIONALS_DEFAULT_CENTER}/${process.env.PROFESIONALS_DEFAULT_SECTION}/${process.env.PROFESIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/profesionals/individual/:centre',
            destination: `/profesionals/individual/:centre/${process.env.PROFESIONALS_DEFAULT_SECTION}/${process.env.PROFESIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/profesionals/individual/:centre/:section',
            destination: `/profesionals/individual/:centre/:section/${process.env.PROFESIONALS_DEFAULT_YEAR}`,
            permanent: false,
         }
      ];
   },
}

module.exports = nextConfig
// module.exports = {}
