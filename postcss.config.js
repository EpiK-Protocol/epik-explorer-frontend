module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 1920,
      minPixelValue: 12,
      unitPrecision: 3,
      exclude: [/node_modules/],
    }
  }
};
