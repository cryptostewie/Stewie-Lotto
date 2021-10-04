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
        primary: '#0d283d',
        gray: '#eff0f5',
        yellow: '#ffdd79',
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
  plugins: []
}
