/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      esmExternals: "loose",
      serverComponentsExternalPackages: ["mongoose", "bcryptjs"]
   },
   async headers() {
      return [
         {
            // matching all API routes
            source: "/api/:path*",
            headers: [
               { key: "Access-Control-Allow-Credentials", value: "true" },
               { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
               { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
               { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
         }
      ]
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
            destination: `/dashboard/${process.env.DASHBOARD_DEFAULT_CENTER}/${process.env.DASHBOARD_DEFAULT_YEAR}/${process.env.DASHBOARD_DEFAULT_SECTION}`,
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
            source: '/professionals',
            destination: `/professionals/${process.env.PROFESSIONALS_DEFAULT_VIEW}/${process.env.PROFESSIONALS_DEFAULT_CENTER}/${process.env.PROFESSIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/professionals/global',
            destination: `/professionals/global/${process.env.PROFESSIONALS_DEFAULT_CENTER}/${process.env.PROFESSIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/professionals/global/:centre',
            destination: `/professionals/global/:centre/${process.env.PROFESSIONALS_DEFAULT_SECTION}`,
            permanent: false,
         },
         {
            source: '/professionals/individual',
            destination: `/professionals/individual/${process.env.PROFESSIONALS_DEFAULT_CENTER}/${process.env.PROFESSIONALS_DEFAULT_SECTION}/${process.env.PROFESSIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/professionals/individual/:centre',
            destination: `/professionals/individual/:centre/${process.env.PROFESSIONALS_DEFAULT_SECTION}/${process.env.PROFESSIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/professionals/individual/:centre/:section',
            destination: `/professionals/individual/:centre/:section/${process.env.PROFESSIONALS_DEFAULT_YEAR}`,
            permanent: false,
         },
         {
            source: '/iqf',
            destination: `/iqf/${process.env.DASHBOARD_DEFAULT_YEAR}`,
            permanent: false,
         }
      ];
   },
}

module.exports = nextConfig
// module.exports = {}
