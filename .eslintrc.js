module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "max-lines": ["error", { max: 200, skipBlankLines: true }],
    "no-console": "warn",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": ["off"],
    "react/destructuring-assignment": ["off"],
    "react/jsx-props-no-spreading": "off",
    "object-curly-newline": ["off"],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
