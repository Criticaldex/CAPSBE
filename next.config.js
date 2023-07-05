/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      esmExternals: "loose",
      serverComponentsExternalPackages: ["mongoose", "bcryptjs"]
   },
   // webpack: (config) => {
   //    config.experiments = { ...config.experiments, topLevelAwait: true };
   //    return config;
   // },
   // reactStrictMode: true,
   // serverRuntimeConfig: {
   //    connectionString: "mongodb://trial.soidemdt.com:27017",
   //    secret: '363f8db2-57f6-44fa-a253-0f046775b9cf-039decab-4a24-43ba-a965-61df165d50d8'
   // },
   // publicRuntimeConfig: {
   //    apiUrl: process.env.NODE_ENV === 'development'
   //       ? 'http://localhost:3000/api' // development api
   //       : 'http://localhost:3000/api' // production api
   // },
   async redirects() {
      return [
         {
            source: '/',
            destination: `/contracts/${process.env.CONTRACTS_DEFAULT_YEAR}/${process.env.CONTRACTS_DEFAULT_CENTER}`,
            permanent: false,
         },
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
