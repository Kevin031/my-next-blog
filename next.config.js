const path = require('path')

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, './components'),
      stores: path.resolve(__dirname, './stores'),
      layer: path.resolve(__dirname, './layer'),
      components: path.resolve(__dirname, './components'),
      ui: path.resolve(__dirname, './ui'),
    }
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader',
        },
        {
          loader: 'markdown-loader',
        },
      ],
    })
    return config
  },
}
