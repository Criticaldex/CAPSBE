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
            nav: 'var(--bg-nav)',
            textColor: 'var(--text-color)',
            textColor2: 'var(--text-color-2)',
            foreground: 'var(--foreground)',
            chart: 'var(--bg-light)',
            darkBlue: 'var(--darkBlue)',
            darkBlue2: 'var(--darkBlue2)',
            lightBlue: 'var(--lightBlue)',
            red: 'var(--red)',
            green: 'var(--green)',
            darkRed: 'var(--darkRed)',
            yellowCustom: 'var(--yellow)',
            bgLight: 'var(--bg-light)',
            bgDark: 'var(--bg-dark)',
            contrario: 'var(--contrario)',
            hover: 'var(--background-start)',
            pestanaDark: 'var(--pestanaDark)',
            pestanaLight: 'var(--pestanaLight)',
            pestanaHover: 'var(--pestanaHover)',
            bgNavGlobal: 'var(--bg-nav-global)',
            TextNav: 'var(--textNav)',
            spacerNav: 'var(--spacerNav)',
            hiper: 'var(--hiper)',
            seleccio: 'var(--seleccio)',
            universals: 'var(--universals)',
            geriatria: 'var(--geriatria)',
            snc: 'var(--snc)',
            highcharts0: 'var(--highcharts0)',
            highcharts1: 'var(--highcharts1)',
            highcharts2: 'var(--highcharts2)',
            highcharts3: 'var(--highcharts3)',
            highcharts4: 'var(--highcharts4)',
            highcharts5: 'var(--highcharts5)',
            highcharts6: 'var(--highcharts6)',
            highcharts7: 'var(--highcharts7)',
            highcharts8: 'var(--highcharts8)',
            highcharts9: 'var(--highcharts9)',
            highcharts10: 'var(--highcharts10)',
         },
         fontFamily: {
            nunito: ['Nunito', 'sans-serif']
         }
      },
   },
   plugins: [],
}
