// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif']
      },
      backgroundSize: {
        '200%': '200%'
      },
      animation: {
        'text-warp': 'text-warp 3s ease-in-out infinite'
      },
      keyframes: {
        'text-warp': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'dark',
      {
        zerg: {
          primary: '#D34242', // Угрожающе-красный для заголовков и акцентов
          secondary: '#4A2C2A', // Тёмно-коричневый для рамок и подложек
          accent: '#682121', // Глубокий мясной красный для дополнительных акцентов
          'card-bg': 'transparent',
          neutral: '#1b1919',
          'base-100': 'rgb(9,10,12)', // Фон страницы
          'base-content': '#E0E0E0', // Бело-серый цвет текста для описаний и второстепенных элементов
          info: '#b3b3b3',
          success: '#6ee7b7',
          warning: '#facc15',
          error: '#f87171'
        },
        terran: {
          primary: '#4FC3F7', // світло-блакитний для акцентів
          secondary: '#1E3A5F', // насичений синій
          accent: '#0D1117', // тінь або глибина
          neutral: '#2B4C74', // темний синій, як фон карток
          'base-100': '#141A26', // загальний фон
          'base-content': '#C0D6EF', // текст: світло-блакитний
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
          '--card-bg': '#1e293b' // можна кастомно під карточки
        },
        protoss: {
          primary: '#FFD700', // золото — головний акцент
          secondary: '#4CDEF5', // лазурно-блакитний для світіння
          accent: '#2C2C54', // глибокий темно-синій для контрасту
          neutral: '#2C2C54', // темно-фіолетовий як базовий фон карток
          'base-100': '#3a2b1f', // основний фон сторінки
          'base-content': '#EDEDED', // світлий текст
          info: '#00CED1',
          success: '#66FFCC',
          warning: '#FFD966',
          error: '#FF6B6B',
          '--card-bg': 'transparent' // фон карток — глибокий синій із фіолетовим відтінком
        }
      }
    ]
  }
}
