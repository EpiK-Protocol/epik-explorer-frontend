module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 1920,
      minPixelValue: 2,
      unitPrecision: 3,
      exclude: [/node_modules/],
    }
  }
};
