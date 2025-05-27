const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    assets: `${__dirname}/assets`,
    api: `${__dirname}/src/api`,
    components: `${__dirname}/src/components`,
    hooks: `${__dirname}/src/hooks`,
    layouts: `${__dirname}/src/layouts`,
    modal: `${__dirname}/src/modal`,
    redux: `${__dirname}/src/redux`,
    utils: `${__dirname}/src/utils`,
    views: `${__dirname}/src/views`,
  },
}

module.exports = withNativeWind(config, { input: './global.css' })
