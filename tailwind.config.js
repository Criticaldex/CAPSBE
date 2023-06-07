/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         colors: {
            body: '#F2F2F2',
            nav: '#262626',
            customBlue: '#0468BF',
            softBlue: '#0dcaf0',
            redCustom: '#ff7b5a',
            yellowCustom: '#31a84f'
         },
         fontFamily: {
            nunito: ['Nunito', 'sans-serif']
         }
      },
   },
   plugins: [],
}
