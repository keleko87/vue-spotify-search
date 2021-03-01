module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["vuejs-accessibility"],
  extends: ["plugin:vue/essential", "plugin:vuejs-accessibility/recommended", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
