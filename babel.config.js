module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            assets: "./assets",
            api: "./src/api",
            components: "./src/components",
            hooks: "./src/hooks",
            layouts: "./src/layouts",
            modal: "./src/modal",
            store: "./src/redux",
            utils: "./src/utils",
            views: "./src/views",
          },
        },
      ],
    ],
  };
};
