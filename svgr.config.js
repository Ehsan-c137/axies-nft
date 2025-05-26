module.exports = {
  typescript: true,
  jsxRuntime: "automatic",
  outDir: "src/components/icons",
  dimensions: true,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  icon: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false
          }
        }
      }
    ]
  },
  filenameCase: 'kebab',
  indexTemplate: (filePaths) => {
    const exportEntries = filePaths.map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
      return `export { default as ${exportName} } from './${basename}'`
    })
    return exportEntries.join('\n')
  }
}