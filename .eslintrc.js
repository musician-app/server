/**
 * @type {import('eslint').Linter.Config}
 */

module.exports = {
     parser: "@typescript-eslint/parser",
     parserOptions: {
          project: "tsconfig.json",
          tsconfigRootDir: __dirname,
          sourceType: "module",
     },
     plugins: ["@typescript-eslint/eslint-plugin"],
     extends: [
          "plugin:@typescript-eslint/recommended"
     ],
     root: true,
     env: {
          node: true,
          jest: true,
     },
     ignorePatterns: [".eslintrc.js"],
     rules: {
          "@typescript-eslint/interface-name-prefix": "off",
          "@typescript-eslint/explicit-function-return-type": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/no-explicit-any": "off",
          "indent": ["error", 5, { ignoredNodes: ["PropertyDefinition"] }],
          "quotes": ["error", "double", {
               "avoidEscape": true,
               "allowTemplateLiterals": true
          }],
          "semi": ["error"],
          "@typescript-eslint/no-unused-vars": [
               "warn",
               {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
               }],
          "@typescript-eslint/no-non-null-assertion": "off"
     },
};
