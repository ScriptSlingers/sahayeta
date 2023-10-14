/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      backgroundImage: {
        comingsoon: "url('/images/coming-soon-bg.png')",
        '404': "url('/images/404-bg.png')"
      },
      borderWidth: {
        1: '1px'
      },
      fontSize: {
        display: ['55px', '72px'],
        heading1: ['46px', '62px'],
        heading2: ['36px', '46px'],
        heading3: ['26px', '40px'],
        heading4: ['22px', '38px'],
        heading5: ['20px', '32px'],
        heading6: ['18px', '26px'],
        label: ['18px', '30px'],
        body: ['16px', '28px'],

        'display-sm': ['48px', '64px'],
        'heading1-sm': ['36px', '54px'],
        'heading2-sm': ['30px', '45px'],
        'heading3-sm': ['24px', '36px'],
        'heading4-sm': ['22px', '32px'],
        'heading5-sm': ['18px', '27px'],
        'heading6-sm': ['14px', '21px'],
        'body-sm': ['14px', '22px'],
        'label-sm': ['16px', '24px']
      },
      colors: {
        gray: {
          100: '#F4F6FC',
          200: '#D9D9D9',
          300: '#C0C0C0',
          600: '#666969',
          900: '#464C4C'
        },
        secondary: '#4E8397',
        accent: '#D5CABD',
        primary: '#D5CABD'
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        maven: ['Maven Pro', 'sans-serif']
      }
    }
  },
  plugins: []
}
