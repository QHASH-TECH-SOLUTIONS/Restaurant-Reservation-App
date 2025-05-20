const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Get the default config
const defaultConfig = getDefaultConfig(__dirname);

// Create your custom config (if needed, otherwise leave it empty)
const config = {};

// Merge default and custom configs
const mergedConfig = mergeConfig(defaultConfig, config);

// Wrap with Reanimated config
module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, {
    resolver: {
      sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
    },
  }),
);
