const purgeEnabled = process.env.NODE_ENV === "production"

console.log("\n")
console.log(`   TailwindCSS \n`)
console.log(`   ----------- \n`)
console.log(`   ✅ purgeEnabled=${purgeEnabled}\n`)

module.exports = {
  purge: {
    enabled: purgeEnabled,
    content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.jsx"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#313660',
        secondary: '#3e4577',
        gray: '#eff0f5',
        yellow: '#deac03',
        blue: '#66b6e7',
      },
      fontFamiliy: {
        sans:['Poppins']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    // Other plugins
    require('tailwind-caret-color')(),
  ]
}
