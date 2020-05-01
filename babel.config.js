module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 10
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-runtime'
  ]
}
