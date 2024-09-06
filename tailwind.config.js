// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust according to your file structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        accent: '#F59E0B',
        background: '#F3F4F6',
        secondary: '#4B5563',
        success: '#10B981',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}
