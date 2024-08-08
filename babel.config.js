const plugins = [['babel-plugin-transform-remove-console'], ['babel-plugin-module-resolver']]

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins,
}
